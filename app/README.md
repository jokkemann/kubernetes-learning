https://cloud.google.com/kubernetes-engine/docs/tutorials/hello-app

Build for GKE:

```
$ docker build --platform=linux/amd64 -t <REGION>-docker.pkg.dev/<PROJECT_ID>/<REPO_NAME>/<IMAGE_NAME>[:<TAG>] .
```

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

Expose to Internet:

```
$ kubectl expose deployment <NAME> --name=<NAME>-service --type=LoadBalancer --port=80 --target-port=3000
```


