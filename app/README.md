https://cloud.google.com/kubernetes-engine/docs/tutorials/hello-app

## To run with kind:

Install kind: https://kind.sigs.k8s.io/docs/user/quick-start/#installation
```
$ docker build -t my-app:0.1 app/ # Technically, :0.1 is not necessary, but using tags makes it easier to deploy changes to the cluster
$
$ kind create cluster --config kind_config.yaml # creates a cluster with the configuration specified in kind_config.yaml, also configures kubectl by creating a ~/.kube/config with the relevant kube context info, so that `kubectl` can be used
$ kind load docker-image my-app:0.1 # Loads the recently built docker image into the kind cluster, so that it can be used for pods
$ kubectl apply -f app/app_deployment.yaml # Will make kubernetes create pods according to the specification file, and creates a service that exposes the application on port 30201 (corresponds to the ports specified in `kind_config.yaml` and `app/app_deployment.yaml`
```

Now, it should be possible to access the application by navigating to http://localhost:30201 using a browser, or `curl` for instance.


## To run in GKE: (Assumes that you've navigated into the app/ folder of the project, the period at the end of the command is important, as that tells docker _what_ to build)
```
$ docker build --platform=linux/amd64 -t <GOOGLE_CLOUD_REGION>-docker.pkg.dev/<PROJECT_ID>/<REPO_NAME>/<IMAGE_NAME>[:<TAG>] .
```

(*Note*: GKE runs nodes in amd64 architecture, but Mac M1 uses the arm64 architecture, so we need to build for the amd64 architecture, which is the reason for the `--platform` argument)

Example:
```
$ docker build --platform=linux/amd64 -t europe-west4-docker.pkg.dev/my-first-project-12345/my-repo/my-app:0.1-amd64 .
```

(*Note*: The image will be locally named europe-west4-docker.pkg.dev/my-first-project-12345/my-repo/my-app:0.1-amd64, but the first part is used to specify private registries, read more at https://docs.docker.com/engine/reference/commandline/tag/#tag-an-image-for-a-private-repository)


Authenticate to gcloud:
```
$ gcloud auth configure-docker \
    europe-west4-docker.pkg.dev
```

To push:
```
$ docker push <REGION>-docker.pkg.dev/<PROJECT_ID>/<REPO_NAME>/<IMAGE_NAME>[:<TAG>]
```

To deploy using kubectl:

```
$ kubectl create deployment <NAME> --image=<THE_FULL_IMAGE_NAME_FROM_ABOVE>
$ kubectl scale deployment <NAME> --replicas=3
$ kubectl autoscale deployment <NAME> --cpu-percent=80 --min=1 --max=5
```

By default, no pods will be accesible outside of the cluster, so to make the application exposed to external requests, you need to create a service of the type LoadBalancer:

```
$ kubectl expose deployment <NAME> --name=<NAME>-service --type=LoadBalancer --port=80 --target-port=3000
```


