const body = document.body;
const themeBtn = document.getElementById('themeBtn');
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const progress = document.getElementById('progress');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') body.classList.add('light');
if (themeBtn) themeBtn.textContent = body.classList.contains('light') ? '☾' : '☼';
themeBtn?.addEventListener('click', () => {
  body.classList.toggle('light');
  localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
  themeBtn.textContent = body.classList.contains('light') ? '☾' : '☼';
});

menuBtn?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navLinks.style.display = navLinks.classList.contains('open') ? 'flex' : '';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '70px';
  navLinks.style.left = '14px';
  navLinks.style.right = '14px';
  navLinks.style.flexDirection = 'column';
  navLinks.style.padding = '12px';
  navLinks.style.background = 'var(--surface)';
  navLinks.style.border = '1px solid var(--line)';
  navLinks.style.borderRadius = '14px';
});
document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
  if (innerWidth < 951) navLinks.classList.remove('open');
}));

window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  if (progress) progress.style.width = (max > 0 ? h.scrollTop / max * 100 : 0) + '%';
});

const obs = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) e.target.classList.add('show');
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(e => obs.observe(e));

const grid = document.getElementById('toolGrid');
document.getElementById('nextTool')?.addEventListener('click', () => grid?.scrollBy({ left: 330, behavior: 'smooth' }));
document.getElementById('prevTool')?.addEventListener('click', () => grid?.scrollBy({ left: -330, behavior: 'smooth' }));

/* ---------- Reliable 3-language picker ---------- */
const translations = {
  en: {
    'nav.home':'Home','nav.about':'About','nav.tools':'Tools','nav.projects':'Projects','nav.experience':'Experience','nav.contact':'Contact','nav.cv':'Download CV ↓',
    'hero.eyebrow':'Software Engineer · Rwanda','hero.title':'Turning ideas into <span>useful software.</span>','hero.lead':'I build modern websites and web applications focused on real-world problems, clean experiences, and practical digital impact.','hero.work':'Explore my work <span>↗</span>','hero.connect':"Let's connect",'hero.location':'📍 Kigali, Rwanda','hero.webdev':'Web development','hero.solutions':'Software solutions','hero.building':'BUILDING FROM<br>RWANDA',
    'tools.label':'My toolbox','tools.title':'Tools I use to turn ideas <span>into software.</span>','tools.lead':'Technologies I use to design, build, test and ship practical digital products.','tools.vscode':'My everyday editor for building focused and maintainable applications.','tools.php':'Server-side language I use to build dynamic and useful web systems.','tools.laravel':'Framework for structured, secure and scalable PHP applications.','tools.react':'Library for building interactive and responsive user interfaces.','tools.mysql':'Database technology for organizing and managing application data.','tools.git':'Version control and collaboration for managing projects safely.',
    'projects.label':'Selected work','projects.title':'Real projects. <span>Real-world focus.</span>','projects.lead':'A developer focused on solving real problems through thoughtful software.','projects.github':'View GitHub ↗','projects.estate':'A digital concept for organizing inheritance and family estate processes in a clearer, more accessible way.','projects.hospital':'Management workflows for patients, doctors, appointments and records.','projects.market':'A local e-commerce concept connecting products, sellers and buyers through a digital marketplace.','projects.edtech':'Education-focused digital work supporting learning, training and software development.',
    'about.label':'About me','about.title':'A developer with <span>purpose.</span>','about.p1':"I'm MUGISHA Etienne, a Software Engineer focused on building websites, web applications and practical software solutions.",'about.p2':"I'm completing my Software Engineering studies at UNILAK while growing my hands-on experience through personal projects and practical training. My goal is simple: keep learning, build useful products, and become a professional Software Engineer.",
    'experience.label':'Experience & education','experience.title':'Learning by <span>building.</span>','experience.edtech':'Kicukiro, Sonatube · Practical software development training and hands-on learning.','experience.unilak':'Level 3 · Completing academic work and developing practical software engineering skills. Expected graduation: August 2027.','experience.school':'Software Development.',
    'contact.label':"Let's build something useful",'contact.title':'Have an idea? <span>Let\'s turn it into software.</span>','contact.lead':"I'm open to opportunities, collaboration and conversations about practical digital solutions.",'contact.email':'Email me ↗','contact.linkedin':'LinkedIn ↗','footer.role':'Software Engineer · Kigali, Rwanda','footer.top':'Back to top ↑'
  },
  rw: {
    'nav.home':'Ahabanza','nav.about':'Abo ndi bo','nav.tools':'Ibikoresho','nav.projects':'Imishinga','nav.experience':'Uburambe','nav.contact':'Twandikire','nav.cv':'Kuramo CV ↓',
    'hero.eyebrow':'Software Engineer · Rwanda','hero.title':'Mpindura ibitekerezo <span>software ifite akamaro.</span>','hero.lead':'Nubaka websites na web applications zishingiye ku gukemura ibibazo nyabyo, kugira experience nziza no gutanga umusaruro mu ikoranabuhanga.','hero.work':'Reba imishinga yanjye <span>↗</span>','hero.connect':'Tuvugane','hero.location':'📍 Kigali, Rwanda','hero.webdev':'Guteza imbere websites','hero.solutions':'Software solutions','hero.building':'NUBAKA NDI<br>MU RWANDA',
    'tools.label':'Ibikoresho nkoresha','tools.title':'Ibikoresho nkoresha guhindura ibitekerezo <span>software.</span>','tools.lead':'Technologies nkoresha mu gutegura, kubaka, kugerageza no gushyira mu bikorwa products za digital.','tools.vscode':'Editor nkoresha buri munsi mu kubaka applications zisukuye kandi zoroshye kubungabunga.','tools.php':'Ururimi rwa server nkoresha mu kubaka web systems zikora kandi zifite akamaro.','tools.laravel':'Framework ya PHP ifasha kubaka applications zifite structure, umutekano n’ubushobozi bwo kwaguka.','tools.react':'Library nkoresha mu kubaka interfaces zikora neza kandi zisubiza vuba.','tools.mysql':'Database technology nkoresha gutunganya no gucunga amakuru ya applications.','tools.git':'Version control na collaboration byo gucunga projects neza.',
    'projects.label':'Imirimo natoranyije','projects.title':'Imishinga nyayo. <span>Yibanda ku bibazo nyabyo.</span>','projects.lead':'Developer wibanda ku gukemura ibibazo nyabyo akoresheje software itekerejwe neza.','projects.github':'Reba GitHub ↗','projects.estate':'Igitekerezo cya digital gifasha gutunganya inzira z’izungura n’imicungire y’umutungo w’umuryango mu buryo bworoshye kandi bwumvikana.','projects.hospital':'System ifasha gucunga abarwayi, abaganga, appointments n’amakuru yabo.','projects.market':'Marketplace ihuza products, sellers n’abaguzi binyuze mu buryo bwa digital.','projects.edtech':'Imirimo ya digital ijyanye n’uburezi, training no guteza imbere software.',
    'about.label':'Abo ndi bo','about.title':'Developer ufite <span>intego.</span>','about.p1':'Ndi MUGISHA Etienne, Software Engineer wibanda ku kubaka websites, web applications na software solutions zifite akamaro.','about.p2':'Ndimo gusoza amasomo ya Software Engineering muri UNILAK, nkomeza kongera experience nkoresheje personal projects na practical training. Intego yanjye ni gukomeza kwiga, kubaka products zifite akamaro no kuba professional Software Engineer.',
    'experience.label':'Uburambe n’amashuri','experience.title':'Kwiga binyuze mu <span>kubaka.</span>','experience.edtech':'Kicukiro, Sonatube · Practical training mu software development no kwiga binyuze mu bikorwa.','experience.unilak':'Level 3 · Ndimo gusoza imirimo y’amashuri no kongera ubumenyi bwa software engineering. Biteganyijwe ko nzarangiza muri Kanama 2027.','experience.school':'Software Development.',
    'contact.label':'Reka twubake ikintu gifite akamaro','contact.title':'Ufite igitekerezo? <span>Tukigire software.</span>','contact.lead':'Niteguye opportunities, collaboration n’ibiganiro ku bisubizo bya digital bikemura ibibazo nyabyo.','contact.email':'Nyandikira ↗','contact.linkedin':'LinkedIn ↗','footer.role':'Software Engineer · Kigali, Rwanda','footer.top':'Subira hejuru ↑'
  },
  fr: {
    'nav.home':'Accueil','nav.about':'À propos','nav.tools':'Outils','nav.projects':'Projets','nav.experience':'Expérience','nav.contact':'Contact','nav.cv':'Télécharger CV ↓',
    'hero.eyebrow':'Software Engineer · Rwanda','hero.title':'Je transforme les idées en <span>logiciels utiles.</span>','hero.lead':'Je crée des sites web et applications web modernes axés sur les problèmes réels, une expérience claire et un impact numérique concret.','hero.work':'Voir mes projets <span>↗</span>','hero.connect':'Contactez-moi','hero.location':'📍 Kigali, Rwanda','hero.webdev':'Développement web','hero.solutions':'Solutions logicielles','hero.building':'JE CONSTRUIS DEPUIS<br>LE RWANDA',
    'tools.label':'Ma boîte à outils','tools.title':'Les outils que j’utilise pour transformer les idées <span>en logiciels.</span>','tools.lead':'Les technologies que j’utilise pour concevoir, développer, tester et livrer des produits numériques utiles.','tools.vscode':'Mon éditeur quotidien pour créer des applications propres et faciles à maintenir.','tools.php':'Langage côté serveur que j’utilise pour créer des systèmes web dynamiques et utiles.','tools.laravel':'Framework PHP pour des applications structurées, sécurisées et évolutives.','tools.react':'Bibliothèque pour créer des interfaces interactives et responsives.','tools.mysql':'Technologie de base de données pour organiser et gérer les données des applications.','tools.git':'Contrôle de version et collaboration pour gérer les projets efficacement.',
    'projects.label':'Projets sélectionnés','projects.title':'Des projets réels. <span>Un objectif concret.</span>','projects.lead':'Un développeur qui se concentre sur la résolution de problèmes réels grâce à des logiciels bien pensés.','projects.github':'Voir GitHub ↗','projects.estate':'Concept numérique pour organiser les processus de succession et de gestion du patrimoine familial de façon plus claire et accessible.','projects.hospital':'Flux de gestion pour les patients, médecins, rendez-vous et dossiers.','projects.market':'Concept de marketplace locale reliant produits, vendeurs et acheteurs.','projects.edtech':'Travail numérique orienté vers l’éducation, la formation et le développement logiciel.',
    'about.label':'À propos de moi','about.title':'Un développeur avec un <span>objectif.</span>','about.p1':'Je suis MUGISHA Etienne, Software Engineer spécialisé dans les sites web, applications web et solutions logicielles pratiques.','about.p2':'Je termine mes études de Software Engineering à l’UNILAK tout en développant mon expérience pratique grâce à des projets personnels et une formation professionnelle. Mon objectif est de continuer à apprendre, créer des produits utiles et devenir un Software Engineer professionnel.',
    'experience.label':'Expérience & formation','experience.title':'Apprendre en <span>construisant.</span>','experience.edtech':'Kicukiro, Sonatube · Formation pratique en développement logiciel et apprentissage par la pratique.','experience.unilak':'Niveau 3 · Finalisation du travail académique et développement des compétences pratiques. Diplôme prévu en août 2027.','experience.school':'Développement logiciel.',
    'contact.label':'Construisons quelque chose d’utile','contact.title':'Une idée ? <span>Transformons-la en logiciel.</span>','contact.lead':'Je suis ouvert aux opportunités, collaborations et discussions autour de solutions numériques concrètes.','contact.email':'M’écrire ↗','contact.linkedin':'LinkedIn ↗','footer.role':'Software Engineer · Kigali, Rwanda','footer.top':'Retour en haut ↑'
  }
};

const picker = document.getElementById('languagePicker');
const langBtn = document.getElementById('langBtn');
const languageMenu = document.getElementById('languageMenu');
const langOptions = languageMenu ? [...languageMenu.querySelectorAll('[data-lang]')] : [];

function setLanguage(lang) {
  const dict = translations[lang] || translations.en;
  document.documentElement.lang = lang === 'rw' ? 'rw' : lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });
  const labels = { en: 'EN', rw: 'RW', fr: 'FR' };
  if (langBtn) langBtn.innerHTML = `${labels[lang]} <span>▾</span>`;
  langOptions.forEach(option => option.setAttribute('aria-selected', String(option.dataset.lang === lang)));
  localStorage.setItem('portfolioLanguage', lang);
  if (languageMenu) languageMenu.classList.remove('open');
  langBtn?.setAttribute('aria-expanded', 'false');
}

langBtn?.addEventListener('click', e => {
  e.stopPropagation();
  const open = languageMenu?.classList.toggle('open');
  langBtn.setAttribute('aria-expanded', String(Boolean(open)));
});
langOptions.forEach(option => option.addEventListener('click', () => setLanguage(option.dataset.lang)));
document.addEventListener('click', e => {
  if (picker && !picker.contains(e.target)) {
    languageMenu?.classList.remove('open');
    langBtn?.setAttribute('aria-expanded', 'false');
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    languageMenu?.classList.remove('open');
    langBtn?.setAttribute('aria-expanded', 'false');
  }
});

setLanguage(localStorage.getItem('portfolioLanguage') || 'en');
