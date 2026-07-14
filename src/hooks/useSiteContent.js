import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

const DEFAULT_SETTINGS = {
  logo_url: '',
  background_image: '',
  instagram_url: '',
  facebook_url: '',
  youtube_url: '',
  tiktok_url: '',
  whatsapp_url: '',
  contact_email: 'contato@transformadas.org',
  contact_phone: '(41) 99999-9999',
  contact_address: 'São José dos Pinhais, PR — Brasil',
  about_title: 'Da sala de casa ao Paraná',
  about_text_1: 'Tudo começou há 7 anos atrás, na simplicidade de uma sala de estar em São José dos Pinhais, onde o desejo de ver Deus restaurar vidas superava as limitações de espaço.',
  about_text_2: 'O Senhor abençoou, e depois do primeiro encontro vieram cultos, retiros e conferências. Ao ver mulheres tendo suas identidades restauradas em Deus, surgiu a necessidade de gerar também a restauração social.',
  about_text_3: 'Foi então que surgiu a ideia da Associação Mulheres Transformadas para Transformar.',
  about_image: '',
  about_quote: 'A transformação de uma mulher não termina nela; ela se espalha para sua família, alcança sua comunidade e toca muitas outras vidas.',
  mission_text: 'Promover a transformação integral de mulheres e adolescentes, por meio de acolhimento, cuidado emocional, fortalecimento familiar, desenvolvimento pessoal e capacitação profissional.',
  vision_text: 'Ser uma organização reconhecida por transformar vidas, fortalecer famílias e desenvolver mulheres, impactando a sociedade de forma positiva.',
  purpose_text: 'Acolher mulheres em vulnerabilidade, fortalecer emocionalmente e espiritualmente, restaurar famílias e incentivar o crescimento profissional e pessoal.',
  founder_name: 'Benedita Lima',
  founder_bio_1: 'Nascida no Maranhão, Benedita Lima trouxe consigo a força e a determinação de quem desbrava novos horizontes. Sua jornada pessoal é o alicerce de resiliência sobre o qual o projeto foi construído.',
  founder_bio_2: 'Com uma visão centrada no próximo, estabeleceu no Paraná um legado de acolhimento. Sua liderança não se impõe, mas se manifesta através do serviço incansável às mulheres, promovendo crescimento espiritual e pessoal.',
  founder_quote: 'Benedita é o testemunho vivo de que a transformação é possível. Sua história de superação inspira centenas de mulheres a buscarem sua própria renovação e dignidade.',
  founder_image: '',
  payment_link: '',
  footer_text: 'Associação de mulheres que crescem, estudam, trabalham e nunca perdem a identidade. Da sala de casa ao Paraná — uma jornada de fé e transformação.',
  pix_key: '',
  pix_monthly_30: '',
  pix_25: '',
  pix_50: '',
  pix_100: '',
  pix_200: '',
  pix_free: '',
  whatsapp_url: '',
};

const DEFAULT_SLIDES = [];
const DEFAULT_COURSES = [
  { name: 'Cabeleireiro', icon: 'Scissors' },
  { name: 'Corte e Costura', icon: 'Scissors' },
  { name: 'Gastronomia', icon: 'ChefHat' },
  { name: 'Barbeiro', icon: 'Scissors' },
  { name: 'Manicure e Pedicure', icon: 'Sparkles' },
  { name: 'Pintura', icon: 'Brush' },
  { name: 'Empreendedorismo', icon: 'BookOpen' },
  { name: 'Jiu-jitsu', icon: 'Dumbbell' },
  { name: 'Música', icon: 'Music' },
  { name: 'Confeitaria', icon: 'ChefHat' },
  { name: 'Artes Sagradas', icon: 'Heart' },
  { name: 'Saúde Mental', icon: 'Heart', description: 'Atendimento com psicólogas e psicanalistas' },
];
const DEFAULT_GALLERY = [];

export function useSiteContent() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [slides, setSlides] = useState(DEFAULT_SLIDES);
  const [courses, setCourses] = useState(DEFAULT_COURSES);
  const [gallery, setGallery] = useState(DEFAULT_GALLERY);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const [settingsRes, slidesRes, coursesRes, galleryRes] = await Promise.all([
          supabase.from('site_settings').select('*').limit(1),
          supabase.from('carousel_slides').select('*').order('order', { ascending: true }).limit(50),
          supabase.from('courses').select('*').order('order', { ascending: true }).limit(50),
          supabase.from('gallery_items').select('*').order('order', { ascending: true }).limit(50),
        ]);

        if (settingsRes.data?.length > 0) {
          const loadedSettings = { ...DEFAULT_SETTINGS, ...settingsRes.data[0] };
          setSettings(loadedSettings);
          if (loadedSettings.logo_url) {
            let favicon = document.querySelector("link[rel~='icon']");
            if (!favicon) {
              favicon = document.createElement('link');
              favicon.rel = 'icon';
              document.head.appendChild(favicon);
            }
            favicon.href = loadedSettings.logo_url;
          }
        }
        if (slidesRes.data?.length > 0) setSlides(slidesRes.data.filter((s) => s.active !== false));
        if (coursesRes.data?.length > 0) setCourses(coursesRes.data);
        if (galleryRes.data?.length > 0) setGallery(galleryRes.data);
      } catch (e) {
        // mantém os defaults em caso de erro
        console.error('Falha ao carregar conteúdo do site:', e);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  return { settings, slides, courses, gallery, loaded };
}
