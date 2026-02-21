import {
  Dna, Microscope, Zap, Activity, Scissors, Shield, GitBranch, Copy, Database, Layers,
  Scroll, Pyramid, Bone, Flame, Atom, BookOpen, Flag, XCircle, Award, User,
  PawPrint, Dog, Fish, Rat, Leaf, Cat, Anchor, Bug, Egg,
  Cigarette, Sun, Wine, Biohazard, Scale, AlertTriangle, Sandwich
} from 'lucide-react';

export const funFacts = [
    // --- Biology & Genetics ---
    {
        icon: <Dna className="w-6 h-6 text-emerald-400" />,
        title: "Guardian of the Genome",
        fact: "The TP53 gene produces a protein (p53) that suppresses tumors. It is mutated in roughly 50% of all human cancers."
    },
    {
        icon: <Microscope className="w-6 h-6 text-blue-400" />,
        title: "HeLa Cells",
        fact: "Taken from Henrietta Lacks in 1951, these were the first immortal human cells and are still used in research today."
    },
    {
        icon: <Zap className="w-6 h-6 text-yellow-400" />,
        title: "Warburg Effect",
        fact: "Cancer cells consume glucose at a much higher rate than normal cells, even when oxygen is available."
    },
    {
        icon: <Activity className="w-6 h-6 text-red-400" />,
        title: "Angiogenesis",
        fact: "Tumors can trick the body into growing new blood vessels to feed them, a process called angiogenesis."
    },
    {
        icon: <Scissors className="w-6 h-6 text-purple-400" />,
        title: "Telomeres",
        fact: "Cancer cells often activate an enzyme called telomerase to rebuild their telomeres, effectively preventing cell aging."
    },
    {
        icon: <Shield className="w-6 h-6 text-green-400" />,
        title: "Apoptosis",
        fact: "Normal cells have a self-destruct mechanism called apoptosis; cancer cells often disable this feature."
    },
    {
        icon: <GitBranch className="w-6 h-6 text-indigo-400" />,
        title: "Metastasis",
        fact: "Metastasis is when cancer spreads to a different part of the body. It causes 90% of cancer-related deaths."
    },
    {
        icon: <Copy className="w-6 h-6 text-pink-400" />,
        title: "Clonal Evolution",
        fact: "Tumors are not uniform; they evolve over time, creating sub-populations of cells that can resist treatment."
    },
    {
        icon: <Database className="w-6 h-6 text-cyan-400" />,
        title: "The Cancer Genome Atlas",
        fact: "TCGA has sequenced the genetic mutations of over 33 cancer types to improve our understanding of the disease."
    },
    {
        icon: <Layers className="w-6 h-6 text-orange-400" />,
        title: "Cancer Stem Cells",
        fact: "A small subset of cells within a tumor, called stem cells, may be responsible for relapse and resistance."
    },

    // --- History & Etymology ---
    {
        icon: <Scroll className="w-6 h-6 text-amber-600" />,
        title: "Ancient Origins",
        fact: "The word 'cancer' comes from the Greek 'karkinos' (crab), used by Hippocrates to describe the shape of tumors."
    },
    {
        icon: <Pyramid className="w-6 h-6 text-yellow-600" />,
        title: "First Recorded Case",
        fact: "The Edwin Smith Papyrus (1600 BC) describes breast tumors and states simply: 'There is no treatment.'"
    },
    {
        icon: <Bone className="w-6 h-6 text-stone-400" />,
        title: "Dinosaur Cancer",
        fact: "Paleontologists have discovered a fossilized fibula from a Centrosaurus apertus containing an osteosarcoma."
    },
    {
        icon: <Flame className="w-6 h-6 text-red-500" />,
        title: "Chimney Sweeps",
        fact: "In 1775, Percivall Pott identified the first occupational cancer: scrotal cancer in chimney sweeps caused by soot."
    },
    {
        icon: <Atom className="w-6 h-6 text-green-300" />,
        title: "Radium Girls",
        fact: "Factory workers in the 1920s who painted glowing watch dials ingested radium, leading to severe bone cancer."
    },
    {
        icon: <BookOpen className="w-6 h-6 text-blue-800" />,
        title: "Pap Smear",
        fact: "George Papanicolaou invented the Pap smear in the 1940s, drastically reducing cervical cancer deaths."
    },
    {
        icon: <Flag className="w-6 h-6 text-red-600" />,
        title: "War on Cancer",
        fact: "The US National Cancer Act was signed in 1971, significantly increasing funding for cancer research."
    },
    {
        icon: <XCircle className="w-6 h-6 text-gray-500" />,
        title: "Mustard Gas",
        fact: "Chemotherapy originated from research into nitrogen mustard, a chemical warfare agent used in WWI."
    },
    {
        icon: <Award className="w-6 h-6 text-yellow-500" />,
        title: "Nobel Prize",
        fact: "James Allison and Tasuku Honjo won the 2018 Nobel Prize for discovering how to unleash the immune system on cancer."
    },
    {
        icon: <User className="w-6 h-6 text-pink-300" />,
        title: "Breast Cancer Ribbon",
        fact: "The pink ribbon became the worldwide symbol for breast cancer awareness in the early 1990s."
    },

    // --- Animal Kingdom ---
    {
        icon: <PawPrint className="w-6 h-6 text-stone-500" />,
        title: "Peto's Paradox",
        fact: "Large animals like elephants rarely get cancer, despite having more cells, because they have extra copies of the p53 gene."
    },
    {
        icon: <Dog className="w-6 h-6 text-amber-700" />,
        title: "Tasmanian Devils",
        fact: "Tasmanian Devils suffer from a contagious facial tumor disease spread through biting."
    },
    {
        icon: <Fish className="w-6 h-6 text-blue-500" />,
        title: "Shark Myth",
        fact: "Contrary to popular belief, sharks DO get cancer. The myth was popularized to sell shark cartilage supplements."
    },
    {
        icon: <Rat className="w-6 h-6 text-gray-400" />,
        title: "Naked Mole Rats",
        fact: "These rodents are virtually immune to cancer due to a super-sugar called high-molecular-mass hyaluronan."
    },
    {
        icon: <Dog className="w-6 h-6 text-orange-800" />,
        title: "Canine TVT",
        fact: "Dogs can contract a sexually transmitted cancer called Canine Transmissible Venereal Tumor, which is thousands of years old."
    },
    {
        icon: <Leaf className="w-6 h-6 text-green-500" />,
        title: "Plant Tumors",
        fact: "Plants get tumors called 'galls,' often caused by bacteria like Agrobacterium tumefaciens, but they don't metastasize."
    },
    {
        icon: <Cat className="w-6 h-6 text-purple-300" />,
        title: "White Cats",
        fact: "White cats with blue eyes are significantly more prone to squamous cell carcinoma on their ears due to UV exposure."
    },
    {
        icon: <Anchor className="w-6 h-6 text-blue-700" />,
        title: "Blue Whales",
        fact: "Despite having 1,000 times more cells than humans, whales have lower cancer rates, suggesting potent suppression mechanisms."
    },
    {
        icon: <Bug className="w-6 h-6 text-lime-600" />,
        title: "Fruit Flies",
        fact: "Drosophila (fruit flies) are commonly used to model cancer genetics because 75% of human disease genes have a fly match."
    },
    {
        icon: <Egg className="w-6 h-6 text-yellow-200" />,
        title: "Chicken Virus",
        fact: "The first oncovirus (cancer-causing virus) was discovered in chickens by Peyton Rous in 1911."
    },

    // --- Causes & Risks ---
    {
        icon: <Cigarette className="w-6 h-6 text-gray-600" />,
        title: "Tobacco",
        fact: "Tobacco use is the single largest preventable cause of cancer and accounts for roughly 22% of cancer deaths."
    },
    {
        icon: <Sun className="w-6 h-6 text-orange-500" />,
        title: "UV Radiation",
        fact: "Most skin cancers are caused by exposure to ultraviolet (UV) radiation from the sun or tanning beds."
    },
    {
        icon: <Wine className="w-6 h-6 text-red-800" />,
        title: "Alcohol",
        fact: "Alcohol consumption is a Group 1 carcinogen and is linked to cancers of the mouth, throat, liver, breast, and colon."
    },
    {
        icon: <Biohazard className="w-6 h-6 text-green-600" />,
        title: "Viruses",
        fact: "Viruses like HPV, Hepatitis B and C, and Epstein-Barr cause approximately 15% of all human cancers."
    },
    {
        icon: <Bug className="w-6 h-6 text-rose-400" />,
        title: "H. pylori",
        fact: "Helicobacter pylori is a bacterium that infects the stomach and is a major cause of gastric cancer."
    },
    {
        icon: <Scale className="w-6 h-6 text-blue-400" />,
        title: "Obesity",
        fact: "Excess body weight is associated with an increased risk of developing at least 13 different types of cancer."
    },
    {
        icon: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
        title: "Asbestos",
        fact: "Inhalation of asbestos fibers is the primary cause of mesothelioma, a cancer of the lining of the lungs."
    },
    {
        icon: <Sandwich className="w-6 h-6 text-orange-300" />,
        title: "Processed Meat",
        fact: "The WHO classifies processed meats (bacon, sausage) as Group 1 carcinogens, alongside tobacco and asbestos."
    }
]