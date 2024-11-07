# Setting up a Monorepo with PNPM Workspaces & Nx

## 1. Initialize Project

First, create a new directory for your monorepo:

```bash
mkdir rare-dev
cd rare-dev
```

## 2. Initialize PNPM

```bash
pnpm init
```

create the required folder

```bash
mkdir apps
mkdir libs
```

## 3. Configure PNPM Workspace

Create `pnpm-workspace.yaml` in the root:

```yaml
cat <<EOF > pnpm-workspace.yaml
packages:
  - 'apps/*'
  - 'libs/**'
  - '!**/test/**' # exclude packages that are inside test directories
EOF
```

## 4. Initilaize nx
```bash
pnpx nx@latest init
```



## Using Pnpm
1. to run commands from root folder in specific-app  
   ``` pnpm run [command] --filter [app-name]```  
   *app-name* is from package.json of the specific app  
   eg:  
   ``` pnpm run build --filter learn-react-19 ```

2. adding depedency from work-space in specific-app  
   ``` pnpm add [package-name] --filter [app-name] --workspace```  
   eg:  
   ```pnpm add @rare/exif-remover --filter learn-react-19 --workspace```

3. to install package in workspace level  
   ``` pnpm add package-name -w ```  
   eg:  
   ``` pnpm add nx -w ```
4. to run many commands parallely  
   ``` pnpm run --parallel -r [command] ```  
   eg:  
   ``` pnpm run --parallel -r build ```

## Using Nx
1. to run commands from root folder in specific-app  
   ``` pnpx nx command app-name ```  
   *app-name* is from package.json of the specific app  
   eg:  
   ``` pnpx nx build learn-react-19 ```

2. adding depedency from work-space in specific-app  
   ``` pnpm nx [project]:add [package-name] -w```  
   eg:  
   ```pnpm nx learn-react-19:add @rare-dev/exif-remover -w```

3. to install package in workspace level  
   ``` pnpx nx add [package-name] ```  
   eg:  
   ``` pnpx nx add @nx/plugin ```
4. to run commnad parallely  
   1. in all projects  
      ``` pnpx nx run-many --target=[command] --all ```  
      eg:  
      ``` pnpx nx run-many --target=build --all ```

   2. in only specific projects  
      ``` pnpx nx run-many --target=[command] --project=project1, project2 ```  
      eg:  
      ``` pnpx nx run-many --target=build --project=learn-react-19, project2 ```

5. running command only on affected projects   
   ``` pnpx nx affected --target=[command] ```  
   eg:  
   ```pnpx nx affected --target=build ```


## Nx Config
1. ```cacheableOperations``` - what commands/operations to be cached  
2. ```namedInputs``` - reference a group of files with name  
3. ```targetDefaults``` - what are the targets for a specific operation
eg:  
```js
"targetDefaults": {
       "build": {
             "inputs":["!projectRoot/**/*.md","^!projectRoot/**/*.md"],
             "outputs": ["dist"]
       }
    }
```
i.e for build operation consider input files that are non-markdown files  
the '^' symbol means child projects/depencies

4. ```depends``` - this operation depends on other operation

5. ```affected``` - Tells Nx which base branch to use when calculating affected projects.


## Nx Plugin
Nx plugin is tool that is added Nx work-space  
Nx plugin can contain generators & task executors  

1. to add plugin depedency  
``` pnpx nx add @nx/plugin ```

2. generate a plugin  
   ``` pnpx nx g plugin [path] ```  
   eg:  
   ``` pnpx nx g plugin plugins/code-generator ```  

   this will generate a plug-project under plugins folder


3. generate a generator in a specific plugin  
   ``` pnpx nx g [plugin-path]/[generator-path] ```  
   eg:  
   ``` pnpx nx g generator plugins/code-generator/src/generators/react-ts-lib ```   
   eg2:  
   ``` pnpx nx g generator plugins/code-generator/src/generators/ts-lib ```  

   this command will generate some templates files under files folder  

4. adding template files  
   we can add any no of template files with .template extension under 'files' folder in generators/src 

5. User input ( dynamic values )  
   in schema.json add the required dynamic values, that's need to take user input  
   we can access schema values ( user input values ) in template like <%= name %>

6. checking the generator execution  
   ``` pnpx nx g [plugin-name]:[genrator-name] --dry-run ```  
   eg:  
   ``` pnpx nx g code-generator:react-ts-lib --dry-run ```

7. using a plugin generator  
   ``` pnpx nx g [plugin-name]:[genrator-name] ```  
   eg:  
   ``` pnpx nx g code-generator:react-ts-lib ```
   


# Note:-

1. always use pnpm to add packages, bcz it reads package-name from package.json while adding workspace packages,  
   but nx won't read like that, it treats every folder as project  
   
   eg: adding @rare-dev/error-boundary package in learn-react-18 app (from workspace)  
   ``` pnpm add @rare-dev/error-boundary --filter learn-react-18 --workspace ```

