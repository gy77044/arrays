import { loadModules } from 'esri-loader'
export async function loadEsriModules(modules:string[]): Promise<any[]> {
    try{
        const loadedModules = await loadModules(modules);
        return loadedModules;
    } 
    catch {
        throw new Error('Invalid argument. Expected either a string or an array of strings.');
    }
  }