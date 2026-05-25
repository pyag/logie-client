export function getFolderPath(): string {
    const path = localStorage.getItem('curPath');
    // path should be a JSON string representing an array of folder names, e.g. '["folder1", "folder2"]'
    // we need to return a string like "folder1/folder2"
    return path ? JSON.parse(path).join('/') : '';
}

export function clearFolderPath() {
    localStorage.removeItem('curPath');
}

export function clearParentId() {
    localStorage.removeItem('pid');
}

export function setInitialFolderPath(rootId: string) {
    if (!localStorage.getItem('curPath')) {
        localStorage.setItem('curPath', JSON.stringify(['']));
        localStorage.setItem('pid', JSON.stringify([rootId]));
    }
}

export function getParentId(): string {
    const pid = localStorage.getItem('pid');
    let pidArray: string[] = [];
    if (pid) {
        pidArray = JSON.parse(pid);
    }

    return pidArray.length > 0 ? pidArray[pidArray.length - 1] : '';
}

export function setParentId(newPid: string) {
    const pid = localStorage.getItem('pid');
    let pidArray: string[] = [];
    if (pid) {
        pidArray = JSON.parse(pid);
    }

    pidArray.push(newPid);
    localStorage.setItem('pid', JSON.stringify(pidArray));
}

export function removeLastParentId() {
    const pid = localStorage.getItem('pid');
    if (pid) {
        let pidArray: string[] = JSON.parse(pid);
        pidArray.pop();
        localStorage.setItem('pid', JSON.stringify(pidArray));
    } else {
        // If there is no pid, we can just set it to an empty array
        localStorage.setItem('pid', JSON.stringify([]));
    }
}

export function addFolderToPath(folderName: string) {
    const path = localStorage.getItem('curPath');
    let pathArray: string[] = [];
    if (path) {
        pathArray = JSON.parse(path);
    }
    pathArray.push(folderName);
    localStorage.setItem('curPath', JSON.stringify(pathArray));
}

export function removeLastFolderFromPath() {
    const path = localStorage.getItem('curPath');
    if (path) {
        let pathArray: string[] = JSON.parse(path);
        pathArray.pop();
        localStorage.setItem('curPath', JSON.stringify(pathArray));
    } else {
        // If there is no path, we can just set it to an empty array
        localStorage.setItem('curPath', JSON.stringify([]));
    }
}

export function isRoot(): boolean {
    const path = localStorage.getItem('curPath');
    if (path) {
        const pathArray: string[] = JSON.parse(path);
        return pathArray.length === 0 || (pathArray.length === 1 && pathArray[0] === '');
    }
    // If there is no path, we can consider it as root
    return true;
}
