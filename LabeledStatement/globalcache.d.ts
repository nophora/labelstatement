

import events = require("events");
import minimatch = require("minimatch");

declare function G(pattern: string, cb: (err: Error | null, matches: string[]) => void): G.IGlob;
declare function G(pattern: string, options: G.IOptions, cb: (err: Error | null, matches: string[]) => void): G.IGlob;

declare namespace G {
    function __promisify__(pattern: string, options?: IOptions): Promise<string[]>;

    function sync(pattern: string, options?: IOptions): string[];

    function hasMagic(pattern: string, options?: IOptions): boolean;

    let Glob: IGlobStatic;
    let GlobSync: IGlobSyncStatic;

    interface IOptions extends minimatch.IOptions {
        cwd?: string;
        root?: string;
        dot?: boolean;
        nomount?: boolean;
        mark?: boolean;
        nosort?: boolean;
        stat?: boolean;
        silent?: boolean;
        strict?: boolean;
        cache?: { [path: string]: boolean | 'DIR' | 'FILE' | ReadonlyArray<string> };
        statCache?: { [path: string]: false | { isDirectory(): boolean} | undefined };
        symlinks?: { [path: string]: boolean | undefined };
        realpathCache?: { [path: string]: string };
        sync?: boolean;
        nounique?: boolean;
        nonull?: boolean;
        debug?: boolean;
        nobrace?: boolean;
        noglobstar?: boolean;
        noext?: boolean;
        nocase?: boolean;
        matchBase?: any;
        nodir?: boolean;
        ignore?: string | ReadonlyArray<string>;
        follow?: boolean;
        realpath?: boolean;
        nonegate?: boolean;
        nocomment?: boolean;
        absolute?: boolean;
    }

    interface IGlobStatic extends events.EventEmitter {
        new (pattern: string, cb?: (err: Error | null, matches: string[]) => void): IGlob;
        new (pattern: string, options: IOptions, cb?: (err: Error | null, matches: string[]) => void): IGlob;
        prototype: IGlob;
    }

    interface IGlobSyncStatic {
        new (pattern: string, options?: IOptions): IGlobBase;
        prototype: IGlobBase;
    }

    interface IGlobBase {
        minimatch: minimatch.IMinimatch;
        options: IOptions;
        aborted: boolean;
        cache: { [path: string]: boolean | 'DIR' | 'FILE' | ReadonlyArray<string> };
        statCache: { [path: string]: false | { isDirectory(): boolean; } | undefined };
        symlinks: { [path: string]: boolean | undefined };
        realpathCache: { [path: string]: string };
        found: string[];
    }

    interface IGlob extends IGlobBase, events.EventEmitter {
        pause(): void;
        resume(): void;
        abort(): void;
    }
}

export = G;
