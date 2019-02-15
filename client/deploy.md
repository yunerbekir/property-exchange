# Steps to deploy on prod

This document describes needed steps to deploy on a prod machine

## Prerequisites

These are needed steps in each machine, where ITW UI will be deployed:

* [Install Docker](https://www.docker.com/)
* [Add user to docker group](https://docs.docker.com/install/linux/linux-postinstall/)
* [Install PIP](https://www.saltycrane.com/blog/2010/02/how-install-pip-ubuntu/)
* [Install AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)
* Configure AWS with user secret key - `aws configure`.

## Starting
  + Logging into AWS: `aws ecr get-login --no-include-email | bash -` - run this snipped once AWS is configured with secret key etc.
  + Client
    + `docker pull 405342700223.dkr.ecr.eu-central-1.amazonaws.com/itw-ui:latest`
    + `docker run  -p `**port**`:80 -e server=`**server_address**` -e 405342700223.dkr.ecr.eu-central-1.amazonaws.com/itw-ui:latest`
    + `docker run --restart unless-stopped --env-file `**env-path**` -p `**port**`:80 --name intime-frontend -d 405342700223.dkr.ecr.eu-central-1.amazonaws.com/itw-ui:latest`
  + QA
    + `docker pull 405342700223.dkr.ecr.eu-central-1.amazonaws.com/itw-ui:latest`
    + `docker run --restart unless-stopped --env-file `**env-path**` -p `**port**`:80 --name intime-frontend -d 405342700223.dkr.ecr.eu-central-1.amazonaws.com/itw-ui:latest`
  + Example:
    + `docker pull 405342700223.dkr.ecr.eu-central-1.amazonaws.com/itw-ui:latest`
    + `docker run  -p 3000:80 -e server=http://10.65.2.92:7777 405342700223.dkr.ecr.eu-central-1.amazonaws.com/itw-ui:latest`
    + `docker run --restart unless-stopped --env-file ./env.list -p 3000:80 --name intime-frontend -d 405342700223.dkr.ecr.eu-central-1.amazonaws.com/itw-ui:latest`
    + `docker pull 405342700223.dkr.ecr.eu-central-1.amazonaws.com/itw-ui:latest`
    + `docker run --restart unless-stopped --env-file ./qa_itw_env.list -p 9000:80 --name qa-itw-frontend -d 405342700223.dkr.ecr.eu-central-1.amazonaws.com/itw-ui:latest`
  * **Important**: server from environment variables can be absolute path or just the port. You can type only `7777`, which will prepend front-end protocol + hostname
    
## If there is no internet on the machine
  + Build the app locally
  + Create and copy docker tar files. Then upload it to the machine and run. [Details](https://www.techietown.info/2017/02/copy-docker-images-another-host/)
  
## Without docker
+ on your local machine run
   + `npm install`
   + `npm run build`
   + configure  `API_BASE_URL` in **build/index.html**
   + Copy files from **build** directory to the target machine
   + use nginx or node's serve package for serving static content
     + Easiest: 
        + `npm install -g serve`
        + `serve -s build` - build is the directory where the static files are
 
