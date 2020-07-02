import { lstatSync } from 'fs';

export const isFile = (path: string) => {
    return lstatSync(path).isFile()
}