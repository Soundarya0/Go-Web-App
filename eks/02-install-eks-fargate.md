## Install EKS
To install EKS, you need to create an EKS cluster. You can do this using the
AWS CLI or the AWS Management Console. Here are the steps to create an EKS cluster using the

### Install a EKS cluster with EKSCTL
```bash
eksctl create cluster --name demo-cluster --region us-east-1 
```
### Delete the cluster
```bash
eksctl delete cluster --name demo-cluster --region us-east-1
```