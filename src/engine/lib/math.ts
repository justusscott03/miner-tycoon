function random (low: number, high: number) {
    return Math.floor(Math.random() * (high - low) + low);
}

function dist (x1: number, y1: number, x2: number, y2: number) {
    let distX = x1 - x2;
    let distY = y1 - y2;

    return Math.sqrt(sq(distX) + sq(distY));
}

function constrain (num: number, lower: number, upper: number) {
    return num < lower ? lower : num > upper ? upper : num;
}

function min (num1: number, num2: number) {
    return num1 < num2 ? num1 : num2;
}

function max (num1: number, num2: number) {
    return num1 > num2 ? num1 : num2;
}

function abs (num: number) {
    return Math.abs(num);
}

function log (num: number) {
    return Math.log(num);
}

function pow (num: number, exponent: number) {
    return Math.pow(num, exponent);
}

function sq (num: number) {
    return num * num;
}

function sqrt (num: number) {
    return Math.sqrt(num);
}

function round (num: number) {
    return Math.round(num);
}

function ceil (num: number) {
    return Math.ceil(num);
}

function floor (num: number) {
    return Math.floor(num);
}

function map (value: number, start1: number, stop1: number, start2: number, stop2: number) {
    return start2 + ((value - start1) * (stop2 - start2)) / (stop1 - start1);
}

function lerp (a: number, b: number, t: number) {
    return a + t * (b - a);
}

// Adapted from Khan Academy's ProcessingJS noise(): https://cdn.jsdelivr.net/gh/Khan/processing-js@master/processing.js
class Marsaglia {
    z: number;
    w: number;

    constructor(i1: number, i2: number = 521288629) {
        this.z = i1 || 362436069;
        this.w = i2 || 521288629;
    }

    nextInt(): number {
        this.z = (36969 * (this.z & 65535) + (this.z >>> 16)) & 0xFFFFFFFF;
        this.w = (18000 * (this.w & 65535) + (this.w >>> 16)) & 0xFFFFFFFF;
        return (((this.z & 0xFFFF) << 16) | (this.w & 0xFFFF)) >>> 0;
    }

    nextDouble(): number {
        const i = this.nextInt() / 4294967296;
        return i < 0 ? i + 1 : i;
    }

    static createRandomized(): Marsaglia {
        const now = Date.now();
        return new Marsaglia((now / 60000) & 0xFFFFFFFF, now & 0xFFFFFFFF);
    }
}


class PerlinNoise {
    perm: Uint8Array;

    constructor (seed: number) {
        let rnd = seed !== undefined ? new Marsaglia(seed) : Marsaglia.createRandomized();
        let i, j;
        // http://www.noisemachine.com/talk1/17b.html
        // http://mrl.nyu.edu/~perlin/noise/
        // generate permutation
        this.perm = new Uint8Array(512);
        for (i = 0; i < 256; ++i) { 
            this.perm[i] = i; 
        }
        for (i = 0; i < 256; ++i) { 
            let t = this.perm[j = rnd.nextInt() & 0xFF]; 
            this.perm[j] = this.perm[i]; 
            this.perm[i] = t; 
        }
        // copy to avoid taking mod in perm[0];
        for (i = 0; i < 256; ++i) { 
            this.perm[i + 256] = this.perm[i]; 
        }
    }

    grad3d (i: number, x: number, y: number, z: number) {
        let h = i & 15; // convert into 12 gradient directions
        let u = h < 8 ? x : y,
            v = h < 4 ? y : h === 12 || h === 14 ? x : z;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    };

    grad2d (i: number, x: number, y: number) {
        let v = (i & 1) === 0 ? x : y;
        return (i & 2) === 0 ? -v : v;
    };

    grad1d (i: number, x: number) {
        return (i & 1) === 0 ? -x : x;
    };

    noise3d (x: number, y: number, z: number) {
        let X = Math.floor(x) & 255, Y = Math.floor(y) & 255, Z = Math.floor(z) & 255;
        x -= Math.floor(x); y -= Math.floor(y); z -= Math.floor(z);
        let fx = (3 - 2 * x) * x * x, fy = (3 - 2 * y) * y * y, fz = (3 - 2 * z) * z * z;
        let p0 = this.perm[X] + Y, p00 = this.perm[p0] + Z, p01 = this.perm[p0 + 1] + Z,
            p1 = this.perm[X + 1] + Y, p10 = this.perm[p1] + Z, p11 = this.perm[p1 + 1] + Z;
        return lerp(
            lerp( 
                lerp(
                    this.grad3d(this.perm[p00], x, y, z), 
                    this.grad3d(this.perm[p10], x - 1, y, z),
                    fx
                ), 
                lerp(
                    this.grad3d(this.perm[p01], x, y - 1, z), 
                    this.grad3d(this.perm[p11], x - 1, y - 1,z),
                    fx
                ),
                fy
            ),
            lerp(
                lerp(
                    this.grad3d(this.perm[p00 + 1], x, y, z - 1), 
                    this.grad3d(this.perm[p10 + 1], x - 1, y, z - 1),
                    fx
                ),
                lerp(
                    this.grad3d(this.perm[p01 + 1], x, y - 1, z - 1), 
                    this.grad3d(this.perm[p11 + 1], x - 1, y - 1, z - 1),
                    fx
                ),
                fy
            ),
            fz
        );
    };

    noise2d (x: number, y: number) {
        let X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
        x -= Math.floor(x); y -= Math.floor(y);
        let fx = (3 - 2 * x) * x * x, fy = (3 - 2 * y) * y * y;
        let p0 = this.perm[X] + Y, p1 = this.perm[X + 1] + Y;
        return lerp(
            lerp(
                this.grad2d(this.perm[p0], x, y), 
                this.grad2d(this.perm[p1], x - 1, y),
                fx
            ),
            lerp(
                this.grad2d(this.perm[p0 + 1], x, y - 1), 
                this.grad2d(this.perm[p1 + 1], x - 1, y - 1),
                fx
            ),
            fy
        );
    };

    noise1d (x: number) {
        let X = Math.floor(x) & 255;
        x -= Math.floor(x);
        let fx = (3 - 2 * x) * x * x;
        return lerp(
            this.grad1d(this.perm[X], x), 
            this.grad1d(this.perm[X + 1], x - 1),
            fx
        );
    };
}

type NoiseProfile = {
    generator: PerlinNoise | undefined;
    octaves: number;
    fallout: number;
    seed: number | undefined;
};

let noiseProfile: NoiseProfile = { 
    generator: undefined, 
    octaves: 4, 
    fallout: 0.5, 
    seed: undefined
};

function noise (x: number, y: number, z: number) {
    if (noiseProfile.generator === undefined) {
        noiseProfile.generator = new PerlinNoise(noiseProfile.seed!);
    }
    let generator = noiseProfile.generator;
    let effect = 1, k = 1, sum = 0;
    for (let i = 0; i < noiseProfile.octaves; i++) {
        effect *= noiseProfile.fallout;
        switch (arguments.length) {
            case 1:
                sum += effect * (1 + generator.noise1d(k*x))/2; 
            break;
            case 2:
                sum += effect * (1 + generator.noise2d(k*x, k*y))/2; 
            break;
            case 3:
                sum += effect * (1 + generator.noise3d(k*x, k*y, k*z))/2; 
            break;
        }
        k *= 2;
    }
    return sum;
}

export { random, dist, constrain, min, max, abs, log, pow, sq, sqrt, round, ceil, floor, map, lerp, noise };