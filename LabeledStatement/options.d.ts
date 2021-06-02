
import fs = require('fs');

declare function mkdirp(dir: string, cb: (err: NodeJS.ErrnoException, made: mkdirp.Made) => void): void;
declare function mkdirp(dir: string, opts: mkdirp.Mode | mkdirp.Options, cb: (err: NodeJS.ErrnoException, made: mkdirp.Made) => void): void;

declare namespace mkdirp {
    type Made = string | null;
    type Mode = number | string | null;

    interface FsImplementation {
        mkdir: typeof fs.mkdir;
        stat: typeof fs.stat;
    }

    interface FsImplementationSync {
        mkdirSync: typeof fs.mkdirSync;
        statSync: typeof fs.statSync;
    }

    interface Options {
        mode?: Mode;
        fs?: FsImplementation;
    }

    interface OptionsSync {
        mode?: Mode;
        fs?: FsImplementationSync;
    }

    function sync(dir: string, opts?: Mode | OptionsSync): Made;
}
export = mkdirp;
