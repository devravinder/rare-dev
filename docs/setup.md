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