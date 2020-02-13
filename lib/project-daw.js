import { ParserManager } from './parser';
import { platform } from 'process';
import { spawn } from 'child_process';
import path from 'path';
import glob from 'glob';


export async function openProject(projectId) {
    const parserObj = await ParserManager.getInstance(projectId);
    if (parserObj.project.type == 'ableton-project') {
        let projects = parserObj.getProjectFile()
        spawn(getAbletonPath(), [projects[0]]);
    } else {
        throw Error(`Project type not recognised: ${parserObj.project.type}`);
    }    
}

function getAbletonPath() {
    if (platform == 'darwin') {
        let option = {
            cwd: '/Applications',
            absolute: true,
        };
        let files = glob.sync('*Ableton*', option)
        if(!files.length) throw Error(`Couldn't find ableton installed`)
        let livePath = path.join(files[0], '/Contents/MacOS/Live'); 
        return livePath
    } else  {
        // TODO: Add hadler for windows and linux
        throw Error(`Platform not recognised: ${platform}`);
    }
}
