# What is this project about
This project if for learning & open source contribution.  

## Tool & Technologies
NodeJs (Typescript)     
RecatJs (Typescript)  
Nx                      - for managing the mono-repo     
Pnpm                    - package manager & to manage the workspace  

## Project strucuture
folders strucuture
```
rare-dev
│   │ 
├── apps
│   ├── learn-react-18
│   │   ├── .gitignore
│   │   └── README.md
│   │
│   └──  learn-next-15
│   
├── libs
│   ├── error-boundary
│   │   ├── .gitignore
│   │   └── README.md
│   │
│   └── error-boundary
│       ├── .gitignore
│       └── README.md
│   
├── docs
│   ├── setup.md
│   └── contribution.md
│   
├── node_modules
├── .gitignore
├── nx.json
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
└── README.md

``` 


## Conventios

### Folders usage
```
apps - for projects
docs - for documentations
libs - libraries / custom pacakes
plugins - nx plugins
```

### Naming Convention
1. if a project is for *learning the fundamentals* then it is prefiexed with ```learn``` & it is under ```apps``` folder
2. if a project is a open source & solving any solution or if it is any product with specific features, it should be under ```apps``` folder with meaningful name
3. if a project is open source reusable library then it should be under ```libs``` folder with meaningful name

### Project Informration
Every project / lib should have a README.md in the corresponding folder


