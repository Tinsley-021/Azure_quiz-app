import type { TopicId } from './questions';

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export const badges: Badge[] = [
  {
    id: 'first-quiz',
    name: 'First Steps',
    description: 'Complete your first quiz',
    icon: 'Footprints',
    tier: 'bronze',
  },
  {
    id: 'first-perfect',
    name: 'Flawless',
    description: 'Score 100% on any topic quiz',
    icon: 'Star',
    tier: 'gold',
  },
  {
    id: 'all-topics',
    name: 'Well-Rounded',
    description: 'Take a quiz in all 5 topics',
    icon: 'Compass',
    tier: 'silver',
  },
  {
    id: 'notes-master',
    name: 'Bookworm',
    description: 'Read study notes for all 5 topics',
    icon: 'BookMarked',
    tier: 'silver',
  },
  {
    id: 'streak-3',
    name: 'On Fire',
    description: 'Score 70%+ on 3 consecutive quizzes',
    icon: 'Flame',
    tier: 'silver',
  },
  {
    id: 'streak-5',
    name: 'Unstoppable',
    description: 'Score 70%+ on 5 consecutive quizzes',
    icon: 'Zap',
    tier: 'gold',
  },
  {
    id: 'exam-ready',
    name: 'Exam Ready',
    description: 'Reach 80% overall readiness score',
    icon: 'GraduationCap',
    tier: 'gold',
  },
  {
    id: 'full-exam-pass',
    name: 'Exam Conqueror',
    description: 'Pass the full practice exam with 70%+',
    icon: 'Trophy',
    tier: 'platinum',
  },
  {
    id: 'comeback',
    name: 'Comeback Kid',
    description: 'Improve your score by 30%+ on a retake',
    icon: 'TrendingUp',
    tier: 'bronze',
  },
  {
    id: 'flashcard-master',
    name: 'Card Shark',
    description: 'Review 50 flashcards',
    icon: 'Layers',
    tier: 'bronze',
  },
];

export const tierColors: Record<Badge['tier'], { bg: string; border: string; text: string; ring: string; glow: string }> = {
  bronze: {
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    text: 'text-amber-700',
    ring: 'ring-amber-500/30',
    glow: 'shadow-amber-500/20',
  },
  silver: {
    bg: 'bg-slate-50',
    border: 'border-slate-300',
    text: 'text-slate-600',
    ring: 'ring-slate-400/30',
    glow: 'shadow-slate-400/20',
  },
  gold: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-300',
    text: 'text-yellow-700',
    ring: 'ring-yellow-500/30',
    glow: 'shadow-yellow-500/30',
  },
  platinum: {
    bg: 'bg-cyan-50',
    border: 'border-cyan-300',
    text: 'text-cyan-700',
    ring: 'ring-cyan-500/30',
    glow: 'shadow-cyan-500/30',
  },
};

export interface Flashcard {
  id: string;
  topic: TopicId;
  front: string;
  back: string;
}

export const flashcards: Flashcard[] = [
  { id: 'fc-1', topic: 'cloud-concepts', front: 'What does CapEx stand for?', back: 'Capital Expenditure — upfront spending on physical infrastructure like servers and networking gear.' },
  { id: 'fc-2', topic: 'cloud-concepts', front: 'What does OpEx stand for?', back: 'Operational Expenditure — ongoing pay-as-you-go costs for services consumed, like cloud billing.' },
  { id: 'fc-3', topic: 'cloud-concepts', front: 'IaaS vs PaaS vs SaaS — who manages what?', back: 'IaaS: You manage OS+apps+data. PaaS: You manage apps+data only. SaaS: You only manage data and access.' },
  { id: 'fc-4', topic: 'cloud-concepts', front: 'What is elasticity?', back: 'The ability to automatically add or remove resources based on current demand.' },
  { id: 'fc-5', topic: 'cloud-concepts', front: 'What is scalability?', back: 'The ability to increase (scale up) or decrease resources to handle varying load levels.' },
  { id: 'fc-6', topic: 'cloud-concepts', front: 'Name the 4 cloud deployment models', back: 'Public Cloud, Private Cloud, Hybrid Cloud, and Multi-cloud.' },
  { id: 'fc-7', topic: 'azure-services', front: 'What is an Azure region?', back: 'A set of datacenters deployed within a latency-defined perimeter, connected via a low-latency network.' },
  { id: 'fc-8', topic: 'azure-services', front: 'What are Availability Zones?', back: 'Physically separate locations within a region with independent power, cooling, and networking.' },
  { id: 'fc-9', topic: 'azure-services', front: 'What is a resource group?', back: 'A container that holds related Azure resources sharing a common lifecycle — deployed, updated, and deleted together.' },
  { id: 'fc-10', topic: 'azure-services', front: 'What is Azure App Service?', back: 'A fully managed PaaS for hosting web and mobile applications with auto-scaling and CI/CD.' },
  { id: 'fc-11', topic: 'azure-services', front: 'What are Azure Blob Storage access tiers?', back: 'Hot (frequent access), Cool (infrequent, 30-day min), and Archive (rare access, 180-day min).' },
  { id: 'fc-12', topic: 'azure-services', front: 'What is Azure VNet?', back: 'Azure Virtual Network — the fundamental building block for private networks in Azure, enabling secure communication.' },
  { id: 'fc-13', topic: 'azure-services', front: 'What is ExpressRoute?', back: 'A private, dedicated connection to Azure that does not go over the public internet.' },
  { id: 'fc-14', topic: 'azure-services', front: 'What is Azure CDN?', back: 'A content delivery network that caches content at edge nodes globally to reduce latency for users.' },
  { id: 'fc-15', topic: 'security', front: 'What is Microsoft Entra ID (formerly Azure AD)?', back: 'A cloud-based identity and access management service providing SSO, MFA, conditional access, and RBAC.' },
  { id: 'fc-16', topic: 'security', front: 'What is the principle of least privilege?', back: 'Giving users only the minimum permissions needed to perform their assigned tasks.' },
  { id: 'fc-17', topic: 'security', front: 'What does Azure Key Vault store?', back: 'Secrets (API keys, passwords), cryptographic keys (RSA/EC), and certificates (TLS/SSL).' },
  { id: 'fc-18', topic: 'security', front: 'What is Azure WAF?', back: 'Web Application Firewall — protects web apps from OWASP Top 10 threats like SQL injection and XSS.' },
  { id: 'fc-19', topic: 'security', front: 'In the shared responsibility model, what is ALWAYS the customer\'s responsibility?', back: 'Data and information, devices, and accounts & identities (access management).' },
  { id: 'fc-20', topic: 'security', front: 'What is Azure Bastion?', back: 'A service providing secure RDP and SSH access to VMs without exposing public IP addresses.' },
  { id: 'fc-21', topic: 'cost-management', front: 'What is Pay-As-You-Go pricing?', back: 'Per-second billing with no upfront commitment — most flexible but highest per-unit rate.' },
  { id: 'fc-22', topic: 'cost-management', front: 'How much can Reserved Instances save vs Pay-As-You-Go?', back: 'Up to 72% savings with a 1 or 3 year commitment.' },
  { id: 'fc-23', topic: 'cost-management', front: 'What is Azure Spot VMs?', back: 'Unused Azure capacity offered at up to 90% discount, but VMs can be evicted with short notice.' },
  { id: 'fc-24', topic: 'cost-management', front: 'What does the TCO Calculator do?', back: 'Estimates cost savings of migrating on-premises workloads to Azure by comparing total cost of ownership.' },
  { id: 'fc-25', topic: 'cost-management', front: '99.9% SLA = how much downtime per month?', back: 'Approximately 43 minutes of downtime per month.' },
  { id: 'fc-26', topic: 'cost-management', front: 'How do you set spending alerts in Azure?', back: 'Create a budget and set spending alert thresholds in Azure Cost Management (e.g., 80%, 100%).' },
  { id: 'fc-27', topic: 'governance-compliance', front: 'What is Azure Policy?', back: 'A governance service that enforces organizational standards and compliance rules on Azure resources.' },
  { id: 'fc-28', topic: 'governance-compliance', front: 'What are Azure Policy effects?', back: 'Deny (block), Audit (log), DeployIfNotExists (auto-deploy missing config), and Modify.' },
  { id: 'fc-29', topic: 'governance-compliance', front: 'What is an Azure Management Group?', back: 'A hierarchical container for managing multiple subscriptions collectively — applies policies and RBAC across them.' },
  { id: 'fc-30', topic: 'governance-compliance', front: 'What is an ARM template?', back: 'A JSON file defining infrastructure as code for Azure — declarative, idempotent, repeatable deployments.' },
  { id: 'fc-31', topic: 'governance-compliance', front: 'What is Microsoft Defender for Cloud?', back: 'A security posture management and threat protection service with secure score and compliance dashboard.' },
  { id: 'fc-32', topic: 'governance-compliance', front: 'What is Azure Blueprints?', back: 'A package of policies, ARM templates, RBAC, and resource groups for creating repeatable compliant environments.' },
];
