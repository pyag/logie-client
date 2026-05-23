export function getFolderPath(): string {
    const path = localStorage.getItem('curPath');
    // path should be a JSON string representing an array of folder names, e.g. '["folder1", "folder2"]'
    // we need to return a string like "folder1/folder2"
    return path ? JSON.parse(path).join('/') : '';
}

export function clearFolderPath() {
    localStorage.removeItem('curPath');
}

export function setInitialFolderPath() {
    if (!localStorage.getItem('curPath')) {
        localStorage.setItem('curPath', JSON.stringify(['/']));
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

export function removeLastFolderFromPath() {4
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
