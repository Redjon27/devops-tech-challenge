# NestJS Browser Info Logger

---

## 🚀 Overview

This is a minimal **NestJS** application designed to capture and log information about a user's visit.

When accessed (via an HTTP request), the application performs two primary functions:

1.  It immediately **displays information** gathered from the user's browser (e.g., user agent, IP address, etc.) back to the user.
2.  It **saves a record of the visit** to the connected **MongoDB** database, logging details for later analysis.

## 🛠️ Technologies

* [**NestJS**](https://nestjs.com/) (Framework)
* [**Node.js**](https://nodejs.org/) (Runtime)
* **Database:** **MongoDB** (NoSQL)



```
flowchart TD
  A[Repo #1: App (NestJS)] -->|workflow_call| 
  B[Repo #2: CI/CD Workflows]
  B -->|docker push (tag=sha)| R1[JFrog Docker Registry]
  B -->|PR/merge: bump image tag| G[Repo #4: GitOps / Platform]
  G -->|watched| C[ArgoCD App-of-Apps]
  C -->|helm deploy| K[Kubernetes (EKS)]
  H[Repo #3: Central Helm Charts] -->|helm package/publish| R2[JFrog Helm Registry]
  R2 -->|helm pull| C
  K --> P[Prometheus]
  P --> F[Grafana]
infrastructure as code:
  1) https://github.com/Redjon27/kubernetes-terraform-module 
  2) https://github.com/Redjon27/kubernetes-terraform
```
