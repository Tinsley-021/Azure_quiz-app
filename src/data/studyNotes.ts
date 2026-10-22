import type { TopicId } from './questions';

export interface TopicNote {
  heading: string;
  content: string;
  keyPoints: string[];
}

export interface StudyNoteTopic {
  topic: TopicId;
  title: string;
  summary: string;
  notes: TopicNote[];
  glossary: { term: string; definition: string }[];
}

export const studyNotes: StudyNoteTopic[] = [
  {
    topic: 'cloud-concepts',
    title: 'Cloud Concepts',
    summary:
      'Cloud computing delivers computing services over the internet, enabling you to scale elastically, pay only for what you use, and avoid the cost and complexity of buying and maintaining your own hardware.',
    notes: [
      {
        heading: 'What is Cloud Computing?',
        content:
          'Cloud computing is the delivery of computing services — including servers, storage, databases, networking, software, analytics, and intelligence — over the internet ("the cloud"). You typically pay only for cloud services you use, helping lower operating costs, run infrastructure more efficiently, and scale as your business needs change.',
        keyPoints: [
          'On-demand self-service: Provision resources without human interaction',
          'Broad network access: Access from anywhere via standard network',
          'Resource pooling: Multi-tenant, resources shared and dynamically assigned',
          'Rapid elasticity: Scale up/out or down/in quickly',
          'Measured service: Pay only for what you use (metered billing)',
        ],
      },
      {
        heading: 'Cloud Benefits',
        content:
          'Moving to the cloud provides numerous benefits over traditional on-premises IT. The key advantages are cost savings, scalability, elasticity, agility, global reach, and improved disaster recovery.',
        keyPoints: [
          'Scalability: Scale up (add CPU/RAM) or scale out (add instances)',
          'Elasticity: Auto-adjust resources based on demand',
          'Agility: Provision resources in minutes, not weeks',
          'Geo-distribution: Deploy apps globally with a few clicks',
          'Disaster Recovery: Built-in replication and backup options',
          'Cost savings: Shift from CapEx (buying hardware) to OpEx (pay-as-you-go)',
        ],
      },
      {
        heading: 'Service Models: IaaS, PaaS, SaaS',
        content:
          'Cloud services are categorized into three main models based on the level of management the provider takes on versus what you manage.',
        keyPoints: [
          'IaaS: Provider manages physical infrastructure. You manage OS, apps, data. Example: Azure VMs',
          'PaaS: Provider manages OS, runtime, middleware. You manage apps and data. Example: Azure App Service',
          'SaaS: Provider manages everything. You just use the software. Example: Microsoft 365',
          'Shared responsibility increases from SaaS → PaaS → IaaS (you do more)',
          'Serverless (FaaS): Event-driven, fully managed, pay-per-execution. Example: Azure Functions',
        ],
      },
      {
        heading: 'Deployment Models',
        content:
          'Cloud deployment models define where the cloud resources are hosted and who has access to them.',
        keyPoints: [
          'Public Cloud: Owned by a provider, shared by many orgs, accessed via internet',
          'Private Cloud: Used by one org, on-premises or externally hosted, max control',
          'Hybrid Cloud: Combines public + private with data portability between them',
          'Multi-cloud: Uses multiple public cloud providers',
          'Azure Arc: Manage resources across on-prem, multi-cloud, and edge',
        ],
      },
    ],
    glossary: [
      { term: 'CapEx', definition: 'Capital Expenditure — upfront spending on physical infrastructure' },
      { term: 'OpEx', definition: 'Operational Expenditure — ongoing pay-as-you-go costs' },
      { term: 'Elasticity', definition: 'The ability to automatically add or remove resources based on demand' },
      { term: 'Scalability', definition: 'The ability to increase or decrease resources to handle varying load' },
      { term: 'High Availability', definition: 'The ability of a system to remain operational and accessible for long periods' },
      { term: 'Fault Tolerance', definition: 'The ability of a system to continue functioning even when components fail' },
    ],
  },
  {
    topic: 'azure-services',
    title: 'Azure Core Services',
    summary:
      'Azure provides a vast array of services including compute, storage, networking, and databases. Understanding the core architectural components — regions, availability zones, resource groups, and ARM — is essential.',
    notes: [
      {
        heading: 'Azure Architecture',
        content:
          'Azure is organized into regions, availability zones, resource groups, and subscriptions. Understanding this hierarchy is critical for designing reliable, scalable solutions.',
        keyPoints: [
          'Regions: 60+ globally, each a set of datacenters in a latency-defined perimeter',
          'Region Pairs: Each region is paired with another (300+ miles apart) for DR',
          'Availability Zones: Physically separate locations within a region (independent power/cooling/network)',
          'Subscriptions: A billing and management boundary; resources live in subscriptions',
          'Resource Groups: Containers for related resources sharing a lifecycle',
          'Management Groups: Hierarchical containers above subscriptions for governance',
        ],
      },
      {
        heading: 'Compute Services',
        content:
          'Azure offers multiple compute options ranging from full control (IaaS) to fully managed (serverless). Choose based on your need for control, scalability, and cost.',
        keyPoints: [
          'Azure VMs: IaaS, full OS control, good for migrations and custom software',
          'Azure App Service: PaaS for web/mobile apps, auto-scaling, CI/CD built in',
          'Azure Functions: Serverless, event-driven, pay-per-execution, auto-scaling',
          'Azure AKS: Managed Kubernetes for container orchestration',
          'Azure Container Instances: Run containers without managing servers',
          'Azure Batch: Large-scale parallel and HPC workloads',
        ],
      },
      {
        heading: 'Storage Services',
        content:
          'Azure Storage provides durable, scalable, and secure storage for all types of data. A storage account is the foundational container for all Azure Storage services.',
        keyPoints: [
          'Blob Storage: Unstructured data (images, videos, docs). Tiers: Hot, Cool, Archive',
          'Azure Files: Managed file shares (SMB/NFS), cloud or hybrid',
          'Azure Queue: Messages for asynchronous processing between components',
          'Azure Table: NoSQL key-value store for semi-structured data',
          'Azure Disk: Managed/unmanaged disks for VMs (HDD, SSD, Premium SSD, Ultra Disk)',
          'Redundancy: LRS (local), ZRS (zone), GRS (geo), RA-GRS (read-access geo)',
        ],
      },
      {
        heading: 'Networking Services',
        content:
          'Azure networking connects your resources to each other, to the internet, and to on-premises networks. VNet is the core building block.',
        keyPoints: [
          'VNet: Isolated private network for Azure resources; contains subnets',
          'NSG: Network Security Group — filters traffic by rules (allow/deny by port/IP)',
          'Load Balancer: Layer 4, distributes traffic across VMs',
          'Application Gateway: Layer 7, supports URL routing, SSL termination, WAF',
          'Traffic Manager: DNS-based global traffic distribution',
          'Azure CDN: Cache content at edge nodes for low latency',
          'ExpressRoute: Private, dedicated connection to Azure (not over internet)',
          'Azure DNS: Host your DNS domains in Azure',
        ],
      },
    ],
    glossary: [
      { term: 'Region', definition: 'A set of datacenters deployed within a latency-defined perimeter connected via a low-latency network' },
      { term: 'Availability Zone', definition: 'Physically separate locations within a region with independent power, cooling, and networking' },
      { term: 'Resource Group', definition: 'A container that holds related Azure resources sharing a common lifecycle' },
      { term: 'ARM', definition: 'Azure Resource Manager — the deployment and management service for Azure' },
      { term: 'VNet', definition: 'Azure Virtual Network — an isolated network for securely communicating with other Azure resources' },
      { term: 'NSG', definition: 'Network Security Group — filters network traffic to and from Azure resources' },
    ],
  },
  {
    topic: 'security',
    title: 'Security & Access',
    summary:
      'Security in Azure is a shared responsibility between Microsoft and you. Key concepts include identity management, access control, encryption, threat protection, and the shared responsibility model.',
    notes: [
      {
        heading: 'Identity & Access Management',
        content:
          'Microsoft Entra ID (formerly Azure AD) is the cloud-based identity service. It provides authentication, authorization, SSO, MFA, and conditional access for Azure and Microsoft 365.',
        keyPoints: [
          'Entra ID: Cloud identity service — SSO, MFA, B2B, B2C, conditional access',
          'RBAC: Role-Based Access Control — assign roles at scopes (MG → Sub → RG → Resource)',
          'Principle of Least Privilege: Give only minimum needed permissions',
          'MFA: Multi-Factor Authentication — requires 2+ forms of verification',
          'Conditional Access: Rules based on user, location, device, risk level',
          'Managed Identities: Services authenticate without stored credentials',
          'PIM: Privileged Identity Management — JIT admin access',
        ],
      },
      {
        heading: 'Shared Responsibility Model',
        content:
          'Security is shared between the cloud provider and the customer. The division of responsibility depends on the service model (IaaS, PaaS, SaaS).',
        keyPoints: [
          'Provider always handles: Physical datacenter, physical hosts, physical network',
          'Customer always handles: Data, devices, accounts & identities (access)',
          'IaaS: Customer also handles OS, apps, runtime, middleware, networking config',
          'PaaS: Provider handles OS, runtime, middleware; customer handles apps & data',
          'SaaS: Provider handles everything except data and access management',
          'Data and identity are ALWAYS the customer\'s responsibility',
        ],
      },
      {
        heading: 'Security Services',
        content:
          'Azure provides multiple layers of security services to protect resources, detect threats, and respond to incidents.',
        keyPoints: [
          'Azure Key Vault: Store secrets, keys, certificates securely',
          'Azure WAF: Web Application Firewall — protects against OWASP Top 10',
          'Azure Firewall: Managed network firewall for VNet-level filtering',
          'Azure DDoS Protection: Protects against DDoS attacks (Basic & Standard)',
          'Defender for Cloud: Security posture management, threat protection, secure score',
          'Azure Sentinel: Cloud-native SIEM for security incident management',
          'Azure Bastion: Secure RDP/SSH access without public IP on VMs',
        ],
      },
      {
        heading: 'Encryption & Data Protection',
        content:
          'Azure provides encryption at rest and in transit. Understanding the encryption options helps you protect data across its lifecycle.',
        keyPoints: [
          'Encryption at rest: Azure Storage Service Encryption (enabled by default)',
          'Encryption in transit: TLS/SSL for data in motion',
          'Azure Disk Encryption: BitLocker (Windows) / DM-Crypt (Linux) for VM disks',
          'Always Encrypted: SQL Server column-level encryption',
          'Key Vault: Store and manage encryption keys',
          'Double encryption: Some services offer multiple encryption layers',
          'Customer-managed keys (CMK): You control the encryption keys in Key Vault',
        ],
      },
    ],
    glossary: [
      { term: 'Entra ID', definition: 'Microsoft Entra ID (formerly Azure AD) — cloud-based identity and access management service' },
      { term: 'RBAC', definition: 'Role-Based Access Control — managing access through role assignments at various scopes' },
      { term: 'MFA', definition: 'Multi-Factor Authentication — requiring two or more verification methods' },
      { term: 'Key Vault', definition: 'A cloud service for securely storing and managing secrets, keys, and certificates' },
      { term: 'Shared Responsibility', definition: 'The model defining which security tasks are handled by the provider vs the customer' },
      { term: 'WAF', definition: 'Web Application Firewall — protects web apps from common exploits like SQL injection and XSS' },
    ],
  },
  {
    topic: 'cost-management',
    title: 'Cost Management',
    summary:
      'Azure provides tools and pricing options to help you optimize spending. Understanding pricing models, SLAs, and cost management tools is crucial for controlling your cloud budget.',
    notes: [
      {
        heading: 'Pricing Options',
        content:
          'Azure offers multiple pricing models to suit different workload patterns. Choosing the right model can save up to 90% compared to standard pay-as-you-go rates.',
        keyPoints: [
          'Pay-As-You-Go: Per-second billing, no commitment, most flexible, highest rate',
          'Reserved Instances: 1 or 3 year commitment, up to 72% savings',
          'Azure Hybrid Benefit: Reuse on-prem Windows/SQL licenses, up to 85% savings',
          'Spot VMs: Unused Azure capacity, up to 90% savings, can be evicted',
          'Dev/Test Pricing: Discounted rates for dev/test workloads',
          'Free Tier: 12 months free + 55+ always-free services',
        ],
      },
      {
        heading: 'Cost Management Tools',
        content:
          'Azure provides several tools to help you estimate, monitor, and optimize your cloud spending.',
        keyPoints: [
          'Pricing Calculator: Estimate costs before deploying Azure services',
          'TCO Calculator: Compare on-prem vs Azure total cost of ownership',
          'Cost Management: Monitor spending, set budgets, create alerts',
          'Azure Advisor: Get cost optimization recommendations',
          'Cost Analysis: Break down spending by resource, tag, or service',
          'Budgets: Set spending limits and get notified at thresholds',
          'Tags: Organize resources for cost tracking by project/team',
        ],
      },
      {
        heading: 'Service Level Agreements (SLAs)',
        content:
          'SLAs define the performance and availability guarantees Microsoft provides. Understanding SLAs helps you design reliable solutions and know what to expect.',
        keyPoints: [
          '99% = ~7.2 hours downtime/month',
          '99.9% = ~43 minutes downtime/month',
          '99.95% = ~21.6 minutes downtime/month',
          '99.99% = ~4.3 minutes downtime/month',
          'Service credits: If MS fails SLA, you get a percentage of monthly bill back',
          'Composite SLA: Multiply component SLAs (e.g., 99.9% × 99.9% = 99.8%)',
          'Availability zones and sets improve your effective SLA',
        ],
      },
    ],
    glossary: [
      { term: 'Pay-As-You-Go', definition: 'Consumption-based pricing where you pay per second of resource usage with no upfront commitment' },
      { term: 'Reserved Instance', definition: 'A pricing option with 1 or 3 year commitment offering significant savings' },
      { term: 'SLA', definition: 'Service Level Agreement — a formal contract defining performance and availability guarantees' },
      { term: 'TCO', definition: 'Total Cost of Ownership — the complete cost of owning and operating a system' },
      { term: 'Spot VM', definition: 'Unused Azure capacity offered at deep discounts, but can be evicted with short notice' },
      { term: 'Budget', definition: 'A spending limit set in Azure Cost Management that triggers alerts when thresholds are reached' },
    ],
  },
  {
    topic: 'governance-compliance',
    title: 'Governance & Compliance',
    summary:
      'Azure governance ensures your cloud resources comply with organizational standards and regulatory requirements. Tools include Azure Policy, Blueprints, Management Groups, and Defender for Cloud.',
    notes: [
      {
        heading: 'Azure Policy & Blueprints',
        content:
          'Azure Policy enforces compliance rules on your resources. Azure Blueprints packages policies, templates, and RBAC for repeatable environments.',
        keyPoints: [
          'Azure Policy: Enforce rules (tags, regions, encryption, naming conventions)',
          'Policy effects: Deny, Audit, DeployIfNotExists, Modify',
          'Initiatives: Group of policies for a compliance goal (e.g., ISO 27001)',
          'Azure Blueprints: Package policies + ARM templates + RBAC for environments',
          'Compliance dashboard: Track % of resources compliant with policies',
          'Remediation: Auto-fix non-compliant existing resources',
        ],
      },
      {
        heading: 'Management Groups & Hierarchy',
        content:
          'Management Groups provide a hierarchy above subscriptions for applying governance at scale across your entire Azure estate.',
        keyPoints: [
          'Hierarchy: Root MG → Child MGs → Subscriptions → Resource Groups → Resources',
          'Up to 6 levels of management groups',
          'Apply policies and RBAC at MG level — cascades to all children',
          'A subscription belongs to only one management group',
          'Free service — no cost for management groups',
          'Use cases: Enterprise governance, prod/non-prod separation, company-wide policies',
        ],
      },
      {
        heading: 'Monitoring & Compliance',
        content:
          'Azure provides tools to monitor resource health, track compliance, and maintain operational excellence.',
        keyPoints: [
          'Defender for Cloud: Security posture, secure score, compliance dashboard',
          'Azure Monitor: Collect and analyze telemetry from Azure resources',
          'Azure Service Health: Track Azure outages and planned maintenance',
          'Azure Advisor: Recommendations for cost, security, performance, reliability',
          'Azure Resource Graph: Query resources across subscriptions at scale',
          'Log Analytics: Query and analyze log data from Azure Monitor',
          'Application Insights: APM (Application Performance Monitoring) feature of Azure Monitor',
        ],
      },
      {
        heading: 'Compliance & Trust',
        content:
          'Microsoft provides extensive compliance certifications and resources to help you meet regulatory requirements.',
        keyPoints: [
          'Microsoft Trust Center: Central location for compliance info',
          'Service Trust Portal: Compliance reports, audits, and assessments',
          'Compliance offerings: ISO 27001, GDPR, HIPAA, SOC, FedRAMP, PCI DSS',
          'Data residency: Control where your data is stored (region selection)',
          'Data sovereignty: Data subject to laws of the country where it is stored',
          'Azure Government: Isolated cloud for US government entities',
          'Microsoft Privacy Statement: How Microsoft handles personal data',
        ],
      },
    ],
    glossary: [
      { term: 'Azure Policy', definition: 'A governance service that enforces organizational standards on Azure resources' },
      { term: 'Blueprint', definition: 'A package of policies, ARM templates, RBAC, and resource groups for repeatable environments' },
      { term: 'Management Group', definition: 'A hierarchical container for managing multiple subscriptions collectively' },
      { term: 'Defender for Cloud', definition: 'A security posture management and threat protection service' },
      { term: 'Azure Advisor', definition: 'A free service that provides best-practice recommendations for Azure resources' },
      { term: 'Compliance', definition: 'Adherence to laws, regulations, and organizational standards' },
    ],
  },
];

export const getStudyNotesByTopic = (topic: TopicId): StudyNoteTopic | undefined =>
  studyNotes.find((n) => n.topic === topic);
