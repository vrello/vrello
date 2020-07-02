import { writeFileSync, readFileSync, existsSync } from 'fs'

import { validateJSON } from "./tools/validate";
import { isFile } from "./tools/file";
import { generateId } from './tools/ids';

export interface VrelloOptions {
    path: string;
    security?: {
        idLength?: number | 16;
    }
    metadata?: {
        addDates?: boolean | false;  
        addIds?: boolean | true;
    }
}

class VrelloDatabase {
    public options: VrelloOptions;
    public data;

    public get(keyPath: string) {
        return keyPath.split(".").reduce((p, c) => (p && p[c]) ? p[c] : null, this.data)
    }

    public set(keyPath: string, value: any, extraPath?: any) {
        value = this.addMetadata(value)

        const path = keyPath.split(".");

        const lastPath = path.pop()

        const nest = path.reduce((p, c) => {
          if (!p[c]) p[c] = {};
          return p[c];
        }, this.data);

        nest[lastPath] = value;

        this.write()
    }

    public append(parentPath: string, data: any) {
        const currentData = this.get(parentPath);
        const isArray = Array.isArray(currentData)

        data = this.addMetadata(data)

        if(isArray) {
            currentData.push(data)

            this.set(parentPath, currentData)
        } else return null;
    }

    public size(parentPath: string) {
        const data = this.get(parentPath);
        const isArray = Array.isArray(data)

        if(isArray) {
            return data.length;
        } else return null;
    }

    public default(keyPath: string, value: any) {
        const itemExists = this.get(keyPath) !== null;

        if(!itemExists) this.set(keyPath, value)
    }

    public write() {
        const { path } = this.options;

        if(!validateJSON(JSON.stringify(this.data))) throw new Error('Failed to write to disk, JSON is malformed.');
        if(!isFile(path)) throw new Error('Database is a directory, it should be a file.')

        writeFileSync(path, JSON.stringify(this.data, null, 2))
    }

    private init() {
        const { path } = this.options;

        if(!existsSync(path)) {
            writeFileSync(path, JSON.stringify({}, null, 2))
        }

        if(!isFile(path)) throw new Error('Database is a directory, it should be a file.')

        var j = readFileSync(path).toString()
    
        if(!validateJSON(j)) {
            this.resetContents(path)

            j = readFileSync(path).toString()
        }

        this.data = JSON.parse(j);
    }

    private resetContents(path: string) {
        writeFileSync(path, JSON.stringify({}, null, 2))
    }

    private addMetadata(data: any) {
        if(typeof(data) !== "object") return;
        if(!this.options.metadata) return;

        if(this.options.metadata.addDates) {
            data._dates = {
                lastModified: new Date().toISOString()
            }

            if(!data._dates.dateCreated) data._dates.dateCreated = new Date().toISOString()
        }

        if(this.options.metadata.addIds) {
            if(!data._id) data._id = generateId(this.options.security ? this.options.security.idLength : 16)
        }

        return data;
    }

    constructor(options: VrelloOptions) {
        this.options = options;

        this.init()
    }
}

export default VrelloDatabase;