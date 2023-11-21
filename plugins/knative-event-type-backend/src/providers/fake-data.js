export const EventTypes = {
    "apiVersion": "v1",
    "items": [
        {
            "apiVersion": "eventing.knative.dev/v1beta2",
            "kind": "EventType",
            "metadata": {
                "annotations": {
                    "eventing.knative.dev/creator": "system:serviceaccount:knative-eventing:eventing-controller",
                    "eventing.knative.dev/lastModifier": "system:serviceaccount:knative-eventing:eventing-controller"
                },
                "creationTimestamp": "2023-09-07T12:30:12Z",
                "generation": 1,
                "labels": {
                    "eventing.knative.dev/sourceName": "test-api-server-source"
                },
                "name": "71fb09d5437a438332eac803e9e8b137",
                "namespace": "default",
                "ownerReferences": [
                    {
                        "apiVersion": "sources.knative.dev/v1",
                        "blockOwnerDeletion": true,
                        "controller": true,
                        "kind": "ApiServerSource",
                        "name": "test-api-server-source",
                        "uid": "cef25d22-37fa-4caa-ac04-7f604bfd7683"
                    }
                ],
                "resourceVersion": "185018",
                "uid": "022bec1f-bc78-4ade-a28e-168ebd77b331"
            },
            "spec": {
                "reference": {
                    "apiVersion": "eventing.knative.dev/v1",
                    "kind": "Broker",
                    "name": "default",
                    "namespace": "default"
                },
                "source": "https://172.30.0.1:443",
                "type": "dev.knative.apiserver.resource.update"
            },
            "status": {
                "conditions": [
                    {
                        "lastTransitionTime": "2023-09-07T12:30:12Z",
                        "status": "True",
                        "type": "Ready"
                    },
                    {
                        "lastTransitionTime": "2023-09-07T12:30:12Z",
                        "status": "True",
                        "type": "ReferenceExists"
                    }
                ],
                "observedGeneration": 1
            }
        },
        {
            "apiVersion": "eventing.knative.dev/v1beta2",
            "kind": "EventType",
            "metadata": {
                "annotations": {
                    "eventing.knative.dev/creator": "system:serviceaccount:knative-eventing:eventing-controller",
                    "eventing.knative.dev/lastModifier": "system:serviceaccount:knative-eventing:eventing-controller"
                },
                "creationTimestamp": "2023-09-07T12:30:12Z",
                "generation": 1,
                "labels": {
                    "eventing.knative.dev/sourceName": "test-ping-source"
                },
                "name": "e73c53b7d89bb417e7b064b3345741f7",
                "namespace": "default",
                "ownerReferences": [
                    {
                        "apiVersion": "sources.knative.dev/v1",
                        "blockOwnerDeletion": true,
                        "controller": true,
                        "kind": "PingSource",
                        "name": "test-ping-source",
                        "uid": "87af4d7d-5dbd-4eb2-8476-6ee81e92c100"
                    }
                ],
                "resourceVersion": "185024",
                "uid": "3a79c386-5219-499a-abb2-f90ee4820aa2"
            },
            "spec": {
                "reference": {
                    "apiVersion": "eventing.knative.dev/v1",
                    "kind": "Broker",
                    "name": "default",
                    "namespace": "default"
                },
                "source": "/apis/v1/namespaces/default/pingsources/test-ping-source",
                "type": "dev.knative.sources.ping"
            },
            "status": {}
        },
        {
            "apiVersion": "eventing.knative.dev/v1beta2",
            "kind": "EventType",
            "metadata": {
                "annotations": {
                    "eventing.knative.dev/creator": "system:serviceaccount:knative-eventing:eventing-controller",
                    "eventing.knative.dev/lastModifier": "system:serviceaccount:knative-eventing:eventing-controller"
                },
                "creationTimestamp": "2023-09-07T12:30:12Z",
                "generation": 1,
                "labels": {
                    "eventing.knative.dev/sourceName": "test-api-server-source"
                },
                "name": "e84a3f7baf42509597c8af3cfa8c9006",
                "namespace": "default",
                "ownerReferences": [
                    {
                        "apiVersion": "sources.knative.dev/v1",
                        "blockOwnerDeletion": true,
                        "controller": true,
                        "kind": "ApiServerSource",
                        "name": "test-api-server-source",
                        "uid": "cef25d22-37fa-4caa-ac04-7f604bfd7683"
                    }
                ],
                "resourceVersion": "185028",
                "uid": "331cc57b-2b0a-4e5b-a35c-0380c5684f21"
            },
            "spec": {
                "reference": {
                    "apiVersion": "eventing.knative.dev/v1",
                    "kind": "Broker",
                    "name": "default",
                    "namespace": "default"
                },
                "source": "https://172.30.0.1:443",
                "type": "dev.knative.apiserver.resource.add"
            },
            "status": {
                "conditions": [
                    {
                        "lastTransitionTime": "2023-09-07T12:30:12Z",
                        "status": "True",
                        "type": "Ready"
                    },
                    {
                        "lastTransitionTime": "2023-09-07T12:30:12Z",
                        "status": "True",
                        "type": "ReferenceExists"
                    }
                ],
                "observedGeneration": 1
            }
        },
        {
            "apiVersion": "eventing.knative.dev/v1beta2",
            "kind": "EventType",
            "metadata": {
                "annotations": {
                    "eventing.knative.dev/creator": "system:serviceaccount:knative-eventing:eventing-controller",
                    "eventing.knative.dev/lastModifier": "system:serviceaccount:knative-eventing:eventing-controller"
                },
                "creationTimestamp": "2023-09-07T12:30:12Z",
                "generation": 1,
                "labels": {
                    "eventing.knative.dev/sourceName": "test-api-server-source"
                },
                "name": "e8cd1b928879427aa2954f2ce1c2813f",
                "namespace": "default",
                "ownerReferences": [
                    {
                        "apiVersion": "sources.knative.dev/v1",
                        "blockOwnerDeletion": true,
                        "controller": true,
                        "kind": "ApiServerSource",
                        "name": "test-api-server-source",
                        "uid": "cef25d22-37fa-4caa-ac04-7f604bfd7683"
                    }
                ],
                "resourceVersion": "185025",
                "uid": "fedf1c86-b5d0-4b4d-9e75-813cf590e3e6"
            },
            "spec": {
                "reference": {
                    "apiVersion": "eventing.knative.dev/v1",
                    "kind": "Broker",
                    "name": "default",
                    "namespace": "default"
                },
                "source": "https://172.30.0.1:443",
                "type": "dev.knative.apiserver.resource.delete"
            },
            "status": {}
        },
        {
            "apiVersion": "eventing.knative.dev/v1beta2",
            "kind": "EventType",
            "metadata": {
                "annotations": {
                    "eventing.knative.dev/creator": "system:serviceaccount:knative-eventing:mt-broker-ingress",
                    "eventing.knative.dev/lastModifier": "system:serviceaccount:knative-eventing:mt-broker-ingress"
                },
                "creationTimestamp": "2023-09-07T12:23:00Z",
                "generation": 1,
                "name": "et-default-zgv2lmtuyx",
                "namespace": "default",
                "ownerReferences": [
                    {
                        "apiVersion": "eventing.knative.dev/v1",
                        "kind": "Broker",
                        "name": "default",
                        "uid": "f31a4c57-d1e3-4ada-851e-3a6c2c15c478"
                    }
                ],
                "resourceVersion": "160365",
                "uid": "a3282258-d9e3-44de-b447-5c4ac061b423"
            },
            "spec": {
                "description": "Event Type auto-created by controller",
                "reference": {
                    "apiVersion": "eventing.knative.dev/v1",
                    "kind": "Broker",
                    "name": "default",
                    "namespace": "default"
                },
                "source": "/apis/v1/namespaces/default/pingsources/test-ping-source",
                "type": "dev.knative.sources.ping"
            },
            "status": {
                "conditions": [
                    {
                        "lastTransitionTime": "2023-09-07T12:23:00Z",
                        "status": "True",
                        "type": "Ready"
                    },
                    {
                        "lastTransitionTime": "2023-09-07T12:23:00Z",
                        "status": "True",
                        "type": "ReferenceExists"
                    }
                ],
                "observedGeneration": 1
            }
        }
    ],
    "kind": "List",
    "metadata": {
        "resourceVersion": ""
    }
};

export const PingSources = {
    "apiVersion": "v1",
    "items": [
        {
            "apiVersion": "sources.knative.dev/v1",
            "kind": "PingSource",
            "metadata": {
                "annotations": {
                    "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"sources.knative.dev/v1\",\"kind\":\"PingSource\",\"metadata\":{\"annotations\":{},\"name\":\"test-ping-source\",\"namespace\":\"default\"},\"spec\":{\"contentType\":\"application/json\",\"data\":\"{\\\"message\\\": \\\"Hello world!\\\"}\",\"schedule\":\"*/1 * * * *\",\"sink\":{\"ref\":{\"apiVersion\":\"eventing.knative.dev/v1\",\"kind\":\"Broker\",\"name\":\"default\"}}}}\n",
                    "sources.knative.dev/creator": "kubernetes-admin",
                    "sources.knative.dev/lastModifier": "kubernetes-admin"
                },
                "creationTimestamp": "2023-09-08T08:29:32Z",
                "generation": 1,
                "name": "test-ping-source",
                "namespace": "default",
                "resourceVersion": "1837",
                "uid": "2cc7ebbf-7393-4e83-9a3b-b0d189db3826"
            },
            "spec": {
                "contentType": "application/json",
                "data": "{\"message\": \"Hello world!\"}",
                "schedule": "*/1 * * * *",
                "sink": {
                    "ref": {
                        "apiVersion": "eventing.knative.dev/v1",
                        "kind": "Broker",
                        "name": "default"
                    }
                }
            },
            "status": {
                "ceAttributes": [
                    {
                        "source": "/apis/v1/namespaces/default/pingsources/test-ping-source",
                        "type": "dev.knative.sources.ping"
                    }
                ],
                "conditions": [
                    {
                        "lastTransitionTime": "2023-09-08T08:29:40Z",
                        "status": "True",
                        "type": "Deployed"
                    },
                    {
                        "lastTransitionTime": "2023-09-08T08:29:40Z",
                        "status": "True",
                        "type": "Ready"
                    },
                    {
                        "lastTransitionTime": "2023-09-08T08:29:33Z",
                        "status": "True",
                        "type": "SinkProvided"
                    }
                ],
                "observedGeneration": 1,
                "sinkUri": "http://broker-ingress.knative-eventing.svc.cluster.local/default/default"
            }
        }
    ],
    "kind": "List",
    "metadata": {
        "resourceVersion": ""
    }
};

export const ApiServerSources = {
    "apiVersion": "v1",
    "items": [
        {
            "apiVersion": "sources.knative.dev/v1",
            "kind": "ApiServerSource",
            "metadata": {
                "annotations": {
                    "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"sources.knative.dev/v1\",\"kind\":\"ApiServerSource\",\"metadata\":{\"annotations\":{},\"name\":\"test-api-server-source\",\"namespace\":\"default\"},\"spec\":{\"mode\":\"Resource\",\"resources\":[{\"apiVersion\":\"v1\",\"kind\":\"Event\"}],\"serviceAccountName\":\"test-api-server-source-sa\",\"sink\":{\"ref\":{\"apiVersion\":\"eventing.knative.dev/v1\",\"kind\":\"Broker\",\"name\":\"default\"}}}}\n",
                    "sources.knative.dev/creator": "kubernetes-admin",
                    "sources.knative.dev/lastModifier": "kubernetes-admin"
                },
                "creationTimestamp": "2023-09-08T08:29:33Z",
                "generation": 1,
                "name": "test-api-server-source",
                "namespace": "default",
                "resourceVersion": "2091",
                "uid": "300784f7-bbd6-4114-a215-305696789078"
            },
            "spec": {
                "mode": "Resource",
                "resources": [
                    {
                        "apiVersion": "v1",
                        "kind": "Event"
                    }
                ],
                "serviceAccountName": "test-api-server-source-sa",
                "sink": {
                    "ref": {
                        "apiVersion": "eventing.knative.dev/v1",
                        "kind": "Broker",
                        "name": "default"
                    }
                }
            },
            "status": {
                "ceAttributes": [
                    {
                        "source": "https://10.96.0.1:443",
                        "type": "dev.knative.apiserver.resource.add"
                    },
                    {
                        "source": "https://10.96.0.1:443",
                        "type": "dev.knative.apiserver.resource.delete"
                    },
                    {
                        "source": "https://10.96.0.1:443",
                        "type": "dev.knative.apiserver.resource.update"
                    }
                ],
                "conditions": [
                    {
                        "lastTransitionTime": "2023-09-08T08:29:45Z",
                        "status": "True",
                        "type": "Deployed"
                    },
                    {
                        "lastTransitionTime": "2023-09-08T08:29:45Z",
                        "status": "True",
                        "type": "Ready"
                    },
                    {
                        "lastTransitionTime": "2023-09-08T08:29:33Z",
                        "status": "True",
                        "type": "SinkProvided"
                    },
                    {
                        "lastTransitionTime": "2023-09-08T08:29:33Z",
                        "status": "True",
                        "type": "SufficientPermissions"
                    }
                ],
                "namespaces": [
                    "default"
                ],
                "observedGeneration": 1,
                "sinkUri": "http://broker-ingress.knative-eventing.svc.cluster.local/default/default"
            }
        }
    ],
    "kind": "List",
    "metadata": {
        "resourceVersion": ""
    }
};

export const Brokers = {
    "apiVersion": "v1",
    "items": [
        {
            "apiVersion": "eventing.knative.dev/v1",
            "kind": "Broker",
            "metadata": {
                "annotations": {
                    "eventing.knative.dev/broker.class": "MTChannelBasedBroker",
                    "eventing.knative.dev/creator": "kubernetes-admin",
                    "eventing.knative.dev/lastModifier": "kubernetes-admin",
                    "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"eventing.knative.dev/v1\",\"kind\":\"Broker\",\"metadata\":{\"annotations\":{},\"name\":\"default\",\"namespace\":\"default\"}}\n"
                },
                "creationTimestamp": "2023-09-08T08:29:32Z",
                "generation": 1,
                "name": "default",
                "namespace": "default",
                "resourceVersion": "1459",
                "uid": "897ba35d-bf5a-4c0d-bb19-371d1515605a"
            },
            "spec": {
                "config": {
                    "apiVersion": "v1",
                    "kind": "ConfigMap",
                    "name": "config-br-default-channel",
                    "namespace": "knative-eventing"
                },
                "delivery": {
                    "backoffDelay": "PT0.2S",
                    "backoffPolicy": "exponential",
                    "retry": 10
                }
            },
            "status": {
                "address": {
                    "name": "http",
                    "url": "http://broker-ingress.knative-eventing.svc.cluster.local/default/default"
                },
                "annotations": {
                    "knative.dev/channelAPIVersion": "messaging.knative.dev/v1",
                    "knative.dev/channelAddress": "http://default-kne-trigger-kn-channel.default.svc.cluster.local",
                    "knative.dev/channelKind": "InMemoryChannel",
                    "knative.dev/channelName": "default-kne-trigger"
                },
                "conditions": [
                    {
                        "lastTransitionTime": "2023-09-08T08:29:32Z",
                        "status": "True",
                        "type": "Addressable"
                    },
                    {
                        "lastTransitionTime": "2023-09-08T08:29:32Z",
                        "message": "No dead letter sink is configured.",
                        "reason": "DeadLetterSinkNotConfigured",
                        "severity": "Info",
                        "status": "True",
                        "type": "DeadLetterSinkResolved"
                    },
                    {
                        "lastTransitionTime": "2023-09-08T08:29:32Z",
                        "status": "True",
                        "type": "FilterReady"
                    },
                    {
                        "lastTransitionTime": "2023-09-08T08:29:32Z",
                        "status": "True",
                        "type": "IngressReady"
                    },
                    {
                        "lastTransitionTime": "2023-09-08T08:29:32Z",
                        "status": "True",
                        "type": "Ready"
                    },
                    {
                        "lastTransitionTime": "2023-09-08T08:29:32Z",
                        "status": "True",
                        "type": "TriggerChannelReady"
                    }
                ],
                "observedGeneration": 1
            }
        }
    ],
    "kind": "List",
    "metadata": {
        "resourceVersion": ""
    }
};

export const Triggers = {
    "apiVersion": "v1",
    "items": [
        {
            "apiVersion": "eventing.knative.dev/v1",
            "kind": "Trigger",
            "metadata": {
                "annotations": {
                    "eventing.knative.dev/creator": "kubernetes-admin",
                    "eventing.knative.dev/lastModifier": "kubernetes-admin",
                    "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"eventing.knative.dev/v1\",\"kind\":\"Trigger\",\"metadata\":{\"annotations\":{},\"name\":\"trigger\",\"namespace\":\"default\"},\"spec\":{\"broker\":\"default\",\"subscriber\":{\"ref\":{\"apiVersion\":\"v1\",\"kind\":\"Service\",\"name\":\"standalone-request-logger\"}}}}\n"
                },
                "creationTimestamp": "2023-09-08T09:19:33Z",
                "generation": 1,
                "labels": {
                    "eventing.knative.dev/broker": "default"
                },
                "name": "trigger",
                "namespace": "default",
                "resourceVersion": "144435",
                "uid": "0682eb56-e73a-48b6-a552-92af639801fd"
            },
            "spec": {
                "broker": "default",
                "filter": {},
                "subscriber": {
                    "ref": {
                        "apiVersion": "v1",
                        "kind": "Service",
                        "name": "standalone-request-logger",
                        "namespace": "default"
                    }
                }
            },
            "status": {
                "conditions": [
                    {
                        "lastTransitionTime": "2023-09-08T09:19:33Z",
                        "status": "True",
                        "type": "BrokerReady"
                    },
                    {
                        "lastTransitionTime": "2023-09-08T09:19:33Z",
                        "message": "No dead letter sink is configured.",
                        "reason": "DeadLetterSinkNotConfigured",
                        "status": "True",
                        "type": "DeadLetterSinkResolved"
                    },
                    {
                        "lastTransitionTime": "2023-09-08T09:19:33Z",
                        "status": "True",
                        "type": "DependencyReady"
                    },
                    {
                        "lastTransitionTime": "2023-09-08T09:19:34Z",
                        "status": "True",
                        "type": "Ready"
                    },
                    {
                        "lastTransitionTime": "2023-09-08T09:19:33Z",
                        "status": "True",
                        "type": "SubscriberResolved"
                    },
                    {
                        "lastTransitionTime": "2023-09-08T09:19:34Z",
                        "status": "True",
                        "type": "SubscriptionReady"
                    }
                ],
                "observedGeneration": 1,
                "subscriberUri": "http://standalone-request-logger.default.svc.cluster.local"
            }
        }
    ],
    "kind": "List",
    "metadata": {
        "resourceVersion": ""
    }
};

export const Services = {
    "apiVersion": "v1",
    "items": [
        {
            "apiVersion": "v1",
            "kind": "Service",
            "metadata": {
                "annotations": {
                    "kubectl.kubernetes.io/last-applied-configuration": "{\"apiVersion\":\"v1\",\"kind\":\"Service\",\"metadata\":{\"annotations\":{},\"creationTimestamp\":null,\"name\":\"standalone-request-logger\",\"namespace\":\"default\"},\"spec\":{\"ports\":[{\"port\":80,\"protocol\":\"TCP\",\"targetPort\":8080}],\"selector\":{\"run\":\"standalone-request-logger\"}}}\n"
                },
                "creationTimestamp": "2023-09-08T09:19:33Z",
                "name": "standalone-request-logger",
                "namespace": "default",
                "resourceVersion": "144379",
                "uid": "6c70e14f-8042-4774-8c1c-a8897d5e15d4"
            },
            "spec": {
                "clusterIP": "10.96.129.196",
                "clusterIPs": [
                    "10.96.129.196"
                ],
                "internalTrafficPolicy": "Cluster",
                "ipFamilies": [
                    "IPv4"
                ],
                "ipFamilyPolicy": "SingleStack",
                "ports": [
                    {
                        "port": 80,
                        "protocol": "TCP",
                        "targetPort": 8080
                    }
                ],
                "selector": {
                    "run": "standalone-request-logger"
                },
                "sessionAffinity": "None",
                "type": "ClusterIP"
            },
            "status": {
                "loadBalancer": {}
            }
        },
    ],
    "kind": "List",
    "metadata": {
        "resourceVersion": ""
    }
};
