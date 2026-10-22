export interface Question {
  id: number;
  topic: TopicId;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  studyNotes: string;
}

export type TopicId =
  | 'cloud-concepts'
  | 'azure-services'
  | 'security'
  | 'cost-management'
  | 'governance-compliance';

export interface Topic {
  id: TopicId;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  color: string;
  weight: number;
}

export const topics: Topic[] = [
  {
    id: 'cloud-concepts',
    name: 'Cloud Concepts',
    shortName: 'Cloud Concepts',
    description: 'Understand cloud concepts, benefits, types, and service models.',
    icon: 'Cloud',
    color: 'sky',
    weight: 25,
  },
  {
    id: 'azure-services',
    name: 'Azure Core Services',
    shortName: 'Core Services',
    description: 'Understand core Azure services and architectural components.',
    icon: 'Server',
    color: 'emerald',
    weight: 35,
  },
  {
    id: 'security',
    name: 'Security & Access',
    shortName: 'Security',
    description: 'Understand security, privacy, compliance, and trust.',
    icon: 'ShieldCheck',
    color: 'amber',
    weight: 20,
  },
  {
    id: 'cost-management',
    name: 'Cost Management',
    shortName: 'Cost',
    description: 'Understand Azure pricing, SLAs, and cost management.',
    icon: 'DollarSign',
    color: 'rose',
    weight: 10,
  },
  {
    id: 'governance-compliance',
    name: 'Governance & Compliance',
    shortName: 'Governance',
    description: 'Understand governance, compliance, and operational best practices.',
    icon: 'Scale',
    color: 'violet',
    weight: 10,
  },
];

export const questions: Question[] = [
  // ── Cloud Concepts ──────────────────────────────────────────
  {
    id: 1,
    topic: 'cloud-concepts',
    question: 'Which of the following is a benefit of cloud computing?',
    options: [
      'You must purchase and maintain all hardware yourself',
      'You can scale resources up or down dynamically based on demand',
      'You are locked into a fixed amount of storage',
      'You must wait weeks to provision new resources',
    ],
    correctIndex: 1,
    explanation:
      'Scalability is a core benefit of cloud computing. You can increase or decrease resources (CPU, memory, storage) on demand, often within minutes, without buying new hardware. This elasticity means you only pay for what you use.',
    studyNotes:
      'Cloud computing benefits include: Scalability (scale up/out or down/in), Elasticity (auto-adjust to demand), Agility (provision quickly), Geo-distribution (deploy worldwide), Disaster Recovery, and Cost savings (CapEx → OpEx). High Availability is achieved through SLAs. You avoid upfront hardware costs and maintenance.',
  },
  {
    id: 2,
    topic: 'cloud-concepts',
    question: 'What is the difference between CapEx and OpEx in cloud computing?',
    options: [
      'CapEx is ongoing monthly costs; OpEx is a one-time upfront purchase',
      'CapEx is spending money on physical infrastructure upfront; OpEx is spending on services as you use them',
      'CapEx and OpEx are identical in the cloud',
      'CapEx is only used in public cloud; OpEx only in private cloud',
    ],
    correctIndex: 1,
    explanation:
      'Capital Expenditure (CapEx) involves upfront spending on physical assets like servers and networking gear. Operational Expenditure (OpEx) is spending on services and resources as they are consumed, such as cloud service billing. The cloud shifts spending from CapEx to OpEx — you pay for what you use rather than buying hardware.',
    studyNotes:
      'CapEx (Capital Expenditure): Upfront purchase of physical infrastructure (servers, network gear, datacenter space). Deducted over time. OpEx (Operational Expenditure): Ongoing pay-as-you-go costs for services consumed. Cloud computing shifts from CapEx to OpEx. This improves cash flow, reduces risk, and eliminates idle hardware. In the cloud, VMs and storage usage are OpEx.',
  },
  {
    id: 3,
    topic: 'cloud-concepts',
    question: 'Which cloud service model provides virtual machines, networking, and storage, where you manage the OS and applications?',
    options: ['SaaS', 'PaaS', 'IaaS', 'FaaS'],
    correctIndex: 2,
    explanation:
      'Infrastructure as a Service (IaaS) provides virtualized computing resources — VMs, networking, storage — over the internet. The cloud provider manages the physical infrastructure, while you are responsible for the OS, middleware, applications, and data.',
    studyNotes:
      'Cloud Service Models: IaaS (Infrastructure as a Service) — Provider gives you VMs, networking, storage. You manage OS, apps, data. Example: Azure VMs. PaaS (Platform as a Service) — Provider manages OS, runtime, middleware. You manage apps and data. Example: Azure App Service. SaaS (Software as a Service) — Provider manages everything. You just use the software. Example: Microsoft 365. Shared responsibility varies by model.',
  },
  {
    id: 4,
    topic: 'cloud-concepts',
    question: 'Which type of cloud is used by a single organization and is hosted internally or by a third party?',
    options: ['Public cloud', 'Private cloud', 'Hybrid cloud', 'Multi-cloud'],
    correctIndex: 1,
    explanation:
      'A private cloud is used exclusively by a single organization. It can be hosted on-premises in the organization\'s own datacenter or by a third-party service provider. It provides greater control, privacy, and customization but at a higher cost.',
    studyNotes:
      'Cloud Deployment Models: Public Cloud — Owned by a provider (Microsoft, AWS, Google), shared by many organizations, accessed over the internet. Private Cloud — Used by one organization, can be on-premises or externally hosted, maximum control. Hybrid Cloud — Combines public and private clouds with data/portability between them. Multi-cloud — Using multiple public cloud providers. Azure Arc enables management across clouds.',
  },
  {
    id: 5,
    topic: 'cloud-concepts',
    question: 'Which term describes the ability to increase resources (like adding more CPUs or RAM) to an existing VM?',
    options: ['Horizontal scaling (scaling out)', 'Vertical scaling (scaling up)', 'Elasticity', 'Agility'],
    correctIndex: 1,
    explanation:
      'Vertical scaling, also known as "scaling up," involves adding more resources (CPU, RAM, storage) to an existing virtual machine. Horizontal scaling ("scaling out") means adding more VM instances to handle increased load. Vertical scaling has limits based on hardware; horizontal scaling is more flexible.',
    studyNotes:
      'Scaling Types: Vertical Scaling (Scale Up) — Add more CPU/RAM to existing VM. Limits exist. Brief downtime possible. Horizontal Scaling (Scale Out) — Add more VM instances. Scale In to remove instances. No downtime. Better for distributed workloads. Elasticity — Automatic scaling based on demand (auto-scale). Azure Virtual Machine Scale Sets enable horizontal auto-scaling. Scale up for more power; scale out for more capacity.',
  },

  // ── Azure Core Services ─────────────────────────────────────
  {
    id: 6,
    topic: 'azure-services',
    question: 'What is an Azure region?',
    options: [
      'A single datacenter within a specific geographic area',
      'A set of datacenters deployed within a latency-defined perimeter and connected through a regional low-latency network',
      'A country where Azure is available',
      'A geographic area containing exactly one availability zone',
    ],
    correctIndex: 1,
    explanation:
      'An Azure region is a set of datacenters deployed within a latency-defined perimeter and connected through a dedicated regional low-latency network. A region typically contains multiple datacenters and may contain availability zones. Azure has 60+ regions worldwide.',
    studyNotes:
      'Azure Regions: A region is a set of datacenters connected via a low-latency network. Each region is paired with another region (region pairs) for disaster recovery and replication. Some regions support Availability Zones — physically separate locations within a region with independent power, cooling, networking. Special regions exist for compliance (e.g., GovCloud). Region pairs provide geo-replication and prioritized recovery. Most Azure services are available in most regions, but not all.',
  },
  {
    id: 7,
    topic: 'azure-services',
    question: 'Which Azure service is a fully managed Platform-as-a-Service for hosting web applications?',
    options: ['Azure Virtual Machines', 'Azure App Service', 'Azure Kubernetes Service', 'Azure Functions'],
    correctIndex: 1,
    explanation:
      'Azure App Service is a fully managed PaaS offering for hosting web applications and mobile app backends. It supports multiple languages (.NET, Java, Node.js, Python, PHP), auto-scaling, custom domains, SSL, and CI/CD integration. The provider manages the infrastructure and OS.',
    studyNotes:
      'Azure Compute Services: Azure VMs (IaaS) — Full control over OS. Azure App Service (PaaS) — Host web/mobile apps, auto-scaling, CI/CD. Azure Functions (Serverless/FaaS) — Event-driven, pay-per-execution, no infrastructure. Azure AKS (Kubernetes) — Container orchestration. Azure Container Instances — Run containers without provisioning VMs. Azure Batch — Large-scale parallel and HPC workloads. Azure App Service Environments — Fully isolated and dedicated environment for App Service.',
  },
  {
    id: 8,
    topic: 'azure-services',
    question: 'Which Azure storage service is optimized for storing massive amounts of unstructured data like images, videos, and documents?',
    options: ['Azure SQL Database', 'Azure Blob Storage', 'Azure Queue Storage', 'Azure Table Storage'],
    correctIndex: 1,
    explanation:
      'Azure Blob Storage is optimized for storing massive amounts of unstructured data — text, binary data, images, videos, documents. Blobs can be accessed via HTTP/HTTPS from anywhere. It supports three access tiers: Hot, Cool, and Archive for cost optimization.',
    studyNotes:
      'Azure Storage Services: Blob Storage — Unstructured data (images, videos, docs). Access tiers: Hot (frequent access), Cool (infrequent, 30-day min), Archive (rare access, 180-day min). Azure Files — Managed file shares (SMB/NFS). Azure Queue — Store messages for async processing. Azure Table — NoSQL key-value store. Azure Disk Storage — Managed disks for VMs. Storage accounts provide unique namespace. Redundancy options: LRS, GRS, RA-GRS, ZRS. Access keys + SAS tokens for security.',
  },
  {
    id: 9,
    topic: 'azure-services',
    question: 'What is the purpose of an Azure resource group?',
    options: [
      'To bill customers for Azure usage',
      'To act as a container that holds related resources for an Azure solution',
      'To provide a virtual network for your resources',
      'To manage user access to Azure subscriptions',
    ],
    correctIndex: 1,
    explanation:
      'A resource group is a container that holds related Azure resources for a solution. Resources in a group share a common lifecycle — they are deployed, updated, and deleted together. A resource can only belong to one resource group, and resources in a group can span multiple regions.',
    studyNotes:
      'Azure Resource Groups: A container for related resources that share a common lifecycle. Key rules: Each resource exists in exactly ONE resource group. Resources in a group can be in different regions. Resource groups can contain resources from different regions. You can move resources between groups. ARM (Azure Resource Manager) is the deployment/management layer. ARM templates (JSON or Bicep) enable declarative IaC deployments. Tags help organize resources across groups. Resource groups support RBAC at the group level.',
  },
  {
    id: 10,
    topic: 'azure-services',
    question: 'Which Azure service provides a global, content delivery network (CDN) for delivering high-bandwidth content?',
    options: ['Azure Traffic Manager', 'Azure CDN', 'Azure Load Balancer', 'Azure Application Gateway'],
    correctIndex: 1,
    explanation:
      'Azure CDN (Content Delivery Network) is a distributed network of servers that delivers high-bandwidth content to users by caching content at edge nodes close to end users. This reduces latency, improves performance, and reduces load on origin servers.',
    studyNotes:
      'Azure Networking Services: Azure CDN — Cache content at edge locations globally, reduces latency. Azure Load Balancer — Layer 4 load balancing (TCP/UDP), distributes traffic across VMs. Azure Application Gateway — Layer 7 load balancing, supports URL-based routing, SSL termination, WAF. Azure Traffic Manager — DNS-based traffic routing across regions (priority, weighted, performance). Azure Virtual Network (VNet) — Isolated network in Azure. Azure DNS — Host DNS domains. Azure ExpressRoute — Private, dedicated connection to Azure. Azure Network Security Group (NSG) — Filter network traffic.',
  },
  {
    id: 11,
    topic: 'azure-services',
    question: 'What is Azure Virtual Network (VNet)?',
    options: [
      'A firewall service for filtering network traffic',
      'A DNS management service for Azure resources',
      'A service that enables Azure resources to securely communicate with each other, the internet, and on-premises networks',
      'A content delivery network for caching web content',
    ],
    correctIndex: 2,
    explanation:
      'Azure Virtual Network (VNet) is the fundamental building block for your private network in Azure. It enables Azure resources like VMs to securely communicate with each other, the internet, and on-premises networks. VNets provide isolation, segmentation, and routing.',
    studyNotes:
      'Azure VNet (Virtual Network): The fundamental building block for private networks in Azure. Key features: Subnets — Segment the VNet into smaller networks. Network Security Groups (NSGs) — Filter traffic to/from subnets and NICs. VNet Peering — Connect VNets (same or different regions/tenants). VPN Gateway — Encrypted tunnel to on-premises. ExpressRoute — Private dedicated connection. Private Endpoints — Access PaaS services privately. Public IP addresses — Internet-facing access. Subnets cannot overlap. First 3 IPs in each subnet are reserved by Azure.',
  },

  // ── Security & Access ───────────────────────────────────────
  {
    id: 12,
    topic: 'security',
    question: 'What does Azure Active Directory (Entra ID) provide?',
    options: [
      'A firewall for Azure virtual networks',
      'A cloud-based identity and access management service',
      'A data encryption service for Azure Storage',
      'A monitoring service for Azure resources',
    ],
    correctIndex: 1,
    explanation:
      'Azure Active Directory (now called Microsoft Entra ID) is a cloud-based identity and access management (IAM) service. It provides authentication, single sign-on (SSO), multi-factor authentication (MFA), conditional access, and B2B/B2C identity management. It is the backbone for identity in Azure and Microsoft 365.',
    studyNotes:
      'Microsoft Entra ID (formerly Azure AD): Cloud-based Identity and Access Management. Key features: Single Sign-On (SSO) — One identity across apps. Multi-Factor Authentication (MFA) — Extra security layer. Conditional Access — Policies based on user, location, device, risk. RBAC — Role-Based Access Control for Azure resources. App Registration — Register apps for auth. B2B — Guest users from other organizations. B2C — Consumer identity management. Self-Service Password Reset (SSPR). Entra ID Connect — Sync on-prem AD with Entra ID. Security defaults enforce baseline protections.',
  },
  {
    id: 13,
    topic: 'security',
    question: 'What is the principle of least privilege?',
    options: [
      'Giving users all permissions so they can do everything',
      'Giving users only the minimum permissions needed to perform their tasks',
      'Giving users administrator access to all resources',
      'Sharing passwords among team members for convenience',
    ],
    correctIndex: 1,
    explanation:
      'The principle of least privilege means giving users only the minimum permissions needed to perform their assigned tasks. This reduces the attack surface, limits accidental damage, and improves security. In Azure, this is implemented through RBAC by assigning only the necessary roles at the appropriate scope.',
    studyNotes:
      'Principle of Least Privilege (PoLP): Give users, applications, and services only the minimum access needed. Implement in Azure via RBAC (Role-Based Access Control). Key concepts: Roles define what actions are allowed (Owner, Contributor, Reader, custom roles). Scopes: Management Group → Subscription → Resource Group → Resource. Assign roles at the narrowest scope possible. Use managed identities for services instead of storing credentials. Just-In-Time (JIT) access via Azure AD PIM (Privileged Identity Management) — grant admin access temporarily. Regular access reviews to remove unused permissions.',
  },
  {
    id: 14,
    topic: 'security',
    question: 'Which Azure service protects applications from common web exploits like SQL injection and cross-site scripting?',
    options: [
      'Azure Firewall',
      'Azure DDoS Protection',
      'Azure Web Application Firewall (WAF)',
      'Azure Key Vault',
    ],
    correctIndex: 2,
    explanation:
      'Azure Web Application Firewall (WAF) provides centralized protection of web applications from common exploits and vulnerabilities such as SQL injection, cross-site scripting (XSS), and other OWASP top 10 threats. It can be deployed with Azure Application Gateway or Azure Front Door.',
    studyNotes:
      'Azure Security Services: WAF (Web Application Firewall) — Protects against OWASP Top 10 (SQL injection, XSS, etc.) via Application Gateway or Front Door. Azure Firewall — Managed cloud-native firewall, controls inbound/outbound traffic, supports threat intelligence. Azure DDoS Protection — Protects against DDoS attacks (Basic = free, Standard = paid, adaptive tuning). Azure Key Vault — Store secrets, keys, certificates. Azure Sentinel — SIEM (Security Information & Event Management) — Cloud-native SIEM with AI. Azure Security Center/Defender — Unified security management, threat protection. NSGs — Network-level traffic filtering. Azure Bastion — Secure RDP/SSH without public IP.',
  },
  {
    id: 15,
    topic: 'security',
    question: 'What is Azure Key Vault used for?',
    options: [
      'To store and manage secrets, keys, and certificates securely',
      'To monitor the health of Azure virtual machines',
      'To manage user passwords for on-premises Active Directory',
      'To provide a virtual network for Azure resources',
    ],
    correctIndex: 0,
    explanation:
      'Azure Key Vault is a cloud service for securely storing and managing secrets, cryptographic keys, and certificates. It helps developers centralize sensitive data, control access through policies, and rotate keys automatically. Applications can reference Key Vault secrets instead of hard-coding them.',
    studyNotes:
      'Azure Key Vault: Securely store and manage: Secrets (API keys, connection strings, passwords), Keys (RSA/EC cryptographic keys for encryption), Certificates (TLS/SSL certificates). Features: Centralized secret management. Access control via Entra ID + RBAC. Auto-rotation of keys and certificates. Integration with Azure services (VMs, App Service, Functions). Managed identities let services authenticate to Key Vault without storing credentials. Two service tiers: Standard (software-protected) and Premium (HSM-protected). Never store secrets in code or config files — use Key Vault.',
  },
  {
    id: 16,
    topic: 'security',
    question: 'In the shared responsibility model, which of the following is always the customer\'s responsibility?',
    options: [
      'Physical security of the datacenter',
      'The underlying cloud infrastructure (servers, networking)',
      'Data and access management',
      'Host operating system patching for PaaS services',
    ],
    correctIndex: 2,
    explanation:
      'In the shared responsibility model, the customer is always responsible for their data and access management (identity), regardless of the service model. The provider manages physical security and infrastructure. For IaaS, the customer also manages the OS and applications. For PaaS, the provider manages the OS. For SaaS, the provider manages almost everything except data and access.',
    studyNotes:
      'Shared Responsibility Model: Provider always responsible for: Physical datacenter, physical hosts, physical network. Customer always responsible for: Data and information, devices (mobile/PC), accounts and identities (access management). IaaS: Customer manages OS, apps, runtime, middleware, data. Provider manages infrastructure. PaaS: Customer manages apps and data. Provider manages OS, runtime, middleware, infrastructure. SaaS: Customer manages data and access. Provider manages everything else. The division shifts depending on the cloud service model — but data and identity are ALWAYS the customer\'s responsibility.',
  },

  // ── Cost Management ─────────────────────────────────────────
  {
    id: 17,
    topic: 'cost-management',
    question: 'Which Azure pricing option charges you based on your actual resource usage with no upfront commitment?',
    options: ['Reserved Instances', 'Pay-As-You-Go', 'Azure Hybrid Benefit', 'Spot Pricing'],
    correctIndex: 1,
    explanation:
      'Pay-As-You-Go pricing charges you based on actual resource usage (per second for compute, per GB for storage/bandwidth). There is no upfront commitment. This is the most flexible option but typically the most expensive per unit. It is ideal for workloads with unpredictable usage.',
    studyNotes:
      'Azure Pricing Options: Pay-As-You-Go — Per-second billing, no commitment, most flexible, highest rate. Reserved Instances (RI) — 1 or 3 year commitment, up to 72% savings vs PAYG. Azure Hybrid Benefit — Use existing on-prem Windows/SQL licenses in Azure, up to 85% savings. Spot VMs — Use unused Azure capacity, up to 90% savings, but can be evicted. Dev/Test Pricing — Discounted rates for dev/test workloads, requires active VS subscription. Free Tier — 12 months of popular free services + 55+ always-free services. Estimate costs with the Azure Pricing Calculator. Manage costs with Azure Cost Management + budgets + alerts.',
  },
  {
    id: 18,
    topic: 'cost-management',
    question: 'What is the Azure Total Cost of Ownership (TCO) calculator used for?',
    options: [
      'To estimate the cost savings of migrating on-premises workloads to Azure',
      'To calculate the cost of individual Azure services',
      'To determine your monthly Azure bill',
      'To compare prices between different cloud providers',
    ],
    correctIndex: 0,
    explanation:
      'The Azure TCO Calculator helps you estimate the cost savings you can achieve by migrating your on-premises workloads to Azure. You input your current on-premises infrastructure costs (hardware, electricity, IT labor, software), and the tool compares those costs with the equivalent Azure deployment, showing potential savings over time.',
    studyNotes:
      'Azure Cost Tools: TCO Calculator — Compare on-premises costs vs Azure costs for migration planning. Shows total cost of ownership over time. Azure Pricing Calculator — Estimate cost of individual Azure services before deploying. Configure resources, see monthly estimates. Azure Cost Management — Monitor and optimize spending. Features: Cost analysis (breakdown by resource/tag/subscription), Budgets (set spending limits), Alerts (notifications when approaching budget), Cost alerts, Recommendations for saving. Azure Advisor — Free recommendations for cost optimization, security, performance, and reliability. Use tags to organize and track costs across departments/projects.',
  },
  {
    id: 19,
    topic: 'cost-management',
    question: 'What does an Azure Service Level Agreement (SLA) define?',
    options: [
      'The cost of using a particular Azure service',
      'The performance and availability guarantees that Microsoft provides for Azure services',
      'The list of features available in an Azure service tier',
      'The geographic regions where an Azure service is available',
    ],
    correctIndex: 1,
    explanation:
      'An Azure Service Level Agreement (SLA) is a formal agreement that defines the performance and availability guarantees Microsoft provides for Azure services. SLAs specify uptime percentages (e.g., 99.9%, 99.95%, 99.99%) and may include service credits if Microsoft fails to meet the guaranteed levels.',
    studyNotes:
      'Azure SLAs (Service Level Agreements): A formal contract defining performance/availability guarantees. Key SLA levels: 99% = ~7.2 hours downtime/month. 99.9% = ~43 min downtime/month. 99.95% = ~21.6 min downtime/month. 99.99% = ~4.3 min downtime/month. Factors affecting SLAs: Tier (Basic/Standard/Premium), redundancy (single instance vs availability sets/zones). Higher SLAs cost more. If Microsoft fails to meet SLA, you get service credits (a percentage of your monthly bill). SLAs differ per service — check each service\'s SLA. Composite SLAs multiply component SLAs (99.9% × 99.9% = 99.8%). Design for redundancy to maximize SLA.',
  },
  {
    id: 20,
    topic: 'cost-management',
    question: 'How can you set up an alert to notify you when your Azure spending exceeds a certain amount?',
    options: [
      'Use Azure Monitor metrics',
      'Create a budget and set spending alerts in Azure Cost Management',
      'Configure a resource group tag',
      'Enable Azure Advisor recommendations',
    ],
    correctIndex: 1,
    explanation:
      'Azure Cost Management allows you to create budgets and set spending alerts. You define a budget amount for a specific scope (subscription, resource group), and configure alerts that trigger at specific thresholds (e.g., 50%, 80%, 100% of budget). Notifications are sent via email, and you can also trigger actions via action groups.',
    studyNotes:
      'Azure Cost Management & Budgeting: Budgets — Set monthly, quarterly, or annual spending limits at subscription or resource group scope. Spending alerts — Get notified at thresholds (e.g., 80%, 100%). Cost analysis — View spending breakdowns by resource, service, tag, location. Export — Schedule cost data exports to Azure Storage for analysis. Azure Advisor cost recommendations — Identify idle resources, underutilized VMs, unattached disks, reservations to buy. Tags — Organize resources for cost tracking by department/project/environment. Best practices: Monitor regularly, set budgets early, use RI for steady workloads, shut down non-prod VMs, use Spot for batch jobs. Cost Management is free for all subscriptions.',
  },

  // ── Governance & Compliance ─────────────────────────────────
  {
    id: 21,
    topic: 'governance-compliance',
    question: 'What is Azure Policy used for?',
    options: [
      'To monitor the performance of Azure resources',
      'To enforce organizational standards and compliance rules on Azure resources',
      'To manage user identities and access',
      'To calculate the cost of Azure services',
    ],
    correctIndex: 1,
    explanation:
      'Azure Policy is a governance service that enforces organizational standards and compliance rules on Azure resources. It evaluates resources for compliance with defined policies, can prevent non-compliant resources from being created, and can remediate existing non-compliant resources. Examples include enforcing tags, restricting regions, and requiring encryption.',
    studyNotes:
      'Azure Policy: A governance tool to enforce organizational standards and assess compliance. Key features: Policy Definitions — Rules resources must follow (e.g., allowed locations, required tags, encryption required). Policy Assignments — Apply definitions to a scope (mgmt group, subscription, RG). Policy Initiatives — Group of policy definitions (e.g., regulatory compliance). Effects: Deny (block non-compliant), Audit (log non-compliance), DeployIfNotExists (auto-deploy missing config), Modify. Compliance dashboard shows % compliant. Remediation tasks fix existing resources. Use cases: Enforce tagging, restrict regions, require encryption, enforce naming conventions, ensure SKUs. Azure Blueprints — Package of policies, ARM templates, RBAC, and resource groups for repeatable environments.',
  },
  {
    id: 22,
    topic: 'governance-compliance',
    question: 'Which Azure service provides a compliance dashboard and recommendations based on your security posture?',
    options: [
      'Azure Monitor',
      'Microsoft Defender for Cloud',
      'Azure DevOps',
      'Azure Automation',
    ],
    correctIndex: 1,
    explanation:
      'Microsoft Defender for Cloud (formerly Azure Security Center) provides a unified view of your security posture across Azure, on-premises, and multi-cloud environments. It offers a secure score, compliance dashboard, threat protection, and security recommendations. It helps you identify and remediate security issues before they are exploited.',
    studyNotes:
      'Microsoft Defender for Cloud (formerly Azure Security Center): Unified security posture management and threat protection. Key features: Secure Score — Quantified measure of security posture (0-100). Recommendations — Prioritized security improvements. Regulatory compliance dashboard — Track compliance with standards (PCI DSS, ISO 27001, NIST, etc.). Workload protection — Protect VMs, SQL, containers, Key Vault, storage, App Service. Cloud workload protections (Defender plans per resource type). Just-in-Time VM Access — Reduce attack surface by locking down RDP/SSH. Integration with Azure Sentinel (SIEM). Two tiers: Free (basic), Paid (Defender plans per workload). Multi-cloud: supports AWS and GCP resources.',
  },
  {
    id: 23,
    topic: 'governance-compliance',
    question: 'What is the purpose of Azure Resource Manager (ARM) templates?',
    options: [
      'To monitor resource performance in real-time',
      'To define infrastructure as code for repeatable, consistent deployments',
      'To manage user access to Azure subscriptions',
      'To calculate the total cost of Azure resources',
    ],
    correctIndex: 1,
    explanation:
      'ARM templates are JSON files (or Bicep files that compile to ARM JSON) that define the infrastructure and configuration for your Azure deployment using declarative Infrastructure as Code (IaC). They enable repeatable, consistent, and version-controlled deployments. ARM templates are idempotent — deploying the same template multiple times produces the same result.',
    studyNotes:
      'Azure Resource Manager (ARM): The deployment and management service for Azure. All interactions with Azure go through ARM (portal, CLI, PowerShell, SDKs). ARM Templates — JSON files defining infrastructure as code (IaC). Declarative (you describe the desired state, ARM figures out how to achieve it). Idempotent (redeploy = same result). Benefits: Repeatable deployments, version control, consistency, modular (linked templates), parameterization. Bicep — A simpler DSL that compiles to ARM templates. Cleaner syntax, easier to read/write. Other IaC options: Terraform (HashiCorp), Ansible, Pulumi. ARM templates define resources, parameters, variables, outputs, and functions. Deploy via Azure CLI, PowerShell, Portal, or CI/CD pipelines.',
  },
  {
    id: 24,
    topic: 'governance-compliance',
    question: 'Which of the following is an example of Azure governance?',
    options: [
      'Using Azure Monitor to track application performance',
      'Applying tags to resources for organization and cost tracking',
      'Configuring a VPN gateway for on-premises connectivity',
      'Using Azure CDN to cache web content',
    ],
    correctIndex: 1,
    explanation:
      'Applying tags to Azure resources is a governance practice. Tags are key-value pairs that help you organize, categorize, and manage resources for billing, cost tracking, ownership, and compliance purposes. Azure Policy can enforce tagging standards across your Azure environment.',
    studyNotes:
      'Azure Governance Tools: Azure Policy — Enforce compliance rules (regions, tags, encryption, naming). Azure Blueprints — Package policies, ARM templates, RBAC, and RGs for repeatable environments. Azure Resource Graph — Query resources across subscriptions at scale. Tags — Key-value pairs for organizing resources (Cost Center, Environment, Owner, Application). Limit of 50 tags per resource. Azure Management Groups — Hierarchical organization of subscriptions, apply policies/RBAC across subscriptions. Azure Lighthouse — Managed service providers (MSPs) manage customer Azure resources. Azure Compliance: Microsoft Trust Center, Service Trust Portal, compliance offerings (ISO 27001, GDPR, HIPAA, SOC, FedRAMP). Microsoft Privacy Statement. Data residency and data sovereignty considerations.',
  },
  {
    id: 25,
    topic: 'governance-compliance',
    question: 'What is an Azure Management Group?',
    options: [
      'A container for managing user identities in Azure AD',
      'A hierarchical container that lets you manage subscriptions and their resources collectively',
      'A service for monitoring application performance',
      'A pricing tier for Azure virtual machines',
    ],
    correctIndex: 1,
    explanation:
      'Azure Management Groups are hierarchical containers that let you manage multiple subscriptions and their resources collectively. You can apply policies and access control (RBAC) at the management group level, and they cascade to all child subscriptions and resource groups. This enables consistent governance across your entire Azure estate.',
    studyNotes:
      'Azure Management Groups: Hierarchical containers for organizing and managing subscriptions. Hierarchy: Root Management Group → Child Management Groups → Subscriptions → Resource Groups → Resources. Up to 6 levels of management groups (excluding root + subscription). Key benefits: Apply Azure Policy across multiple subscriptions. Apply RBAC across multiple subscriptions. Centralized compliance and governance. Conditional Access policies can be applied at management group level. Important: A subscription can only belong to one management group. You can have up to 10,000 management groups. Management groups are free. Use cases: Enterprise organizations with many subscriptions, separating prod/non-prod, applying company-wide policies, delegating access. The hierarchy is independent of resource group hierarchy.',
  },
];

export const questionsByTopic = (topic: TopicId): Question[] =>
  questions.filter((q) => q.topic === topic);
