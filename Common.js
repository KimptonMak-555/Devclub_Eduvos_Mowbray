export async function grabFile(FileName){
    const response = await fetch(FileName);
    const content = await response.text();
    return content;
}
