## Usage
1. create a basic project ( existing project works ) - as sourceDirectory
2. create generator in code-generator plugin with default files 
   eg: 
   ```pnpx nx g generator plugins/code-generator/src/generators/ts-lib```  
   this will generate a 'ts-lib' generator under 'code-generator' plugin

3. now give the new generator's files path - as targetDirectory  
   i.e for the above example: ~/some_root_path/../plugins/code-generator/src/generators/ts-lib/files
