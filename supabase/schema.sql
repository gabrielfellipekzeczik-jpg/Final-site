-- ============================================================================
-- Schema para o site "Transformadas para Transformar"
-- Rode este arquivo inteiro no Supabase: Dashboard -> SQL Editor -> New query
-- ============================================================================

-- 1. Configurações gerais do site (linha única com todos os textos/links)
create table if not exists site_settings (
  id uuid primary key default gen_random_uuid(),
  logo_url text,
  background_image text,
  instagram_url text,
  facebook_url text,
  youtube_url text,
  tiktok_url text,
  contact_email text,
  contact_phone text,
  contact_address text,
  about_title text,
  about_text_1 text,
  about_text_2 text,
  about_text_3 text,
  about_image text,
  about_quote text,
  mission_text text,
  vision_text text,
  purpose_text text,
  founder_name text,
  founder_bio_1 text,
  founder_bio_2 text,
  founder_quote text,
  founder_image text,
  payment_link text,
  footer_text text,
  pix_key text,
  pix_monthly_30 text,
  pix_25 text,
  pix_50 text,
  pix_100 text,
  pix_200 text,
  pix_free text,
  updated_at timestamptz default now()
);

-- Se sua tabela site_settings já existe no Supabase e não tem essas
-- colunas ainda, rode este bloco pra adicioná-las sem perder dados:
-- alter table site_settings add column if not exists pix_key text;
-- alter table site_settings add column if not exists pix_monthly_30 text;
-- alter table site_settings add column if not exists pix_25 text;
-- alter table site_settings add column if not exists pix_50 text;
-- alter table site_settings add column if not exists pix_100 text;
-- alter table site_settings add column if not exists pix_200 text;
-- alter table site_settings add column if not exists pix_free text;

-- 2. Slides do carrossel da home
create table if not exists carousel_slides (
  id uuid primary key default gen_random_uuid(),
  eyebrow text,
  title_top text,
  italic_before text,
  main_title text,
  italic_after text,
  date_text text,
  time_text text,
  location_text text,
  cta_text text,
  cta_link text,
  image_url text,
  "order" integer default 0,
  active boolean default true,
  created_at timestamptz default now()
);

-- 3. Cursos profissionalizantes
create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  icon text,
  link text,
  description text,
  "order" integer default 0,
  created_at timestamptz default now()
);

-- 4. Galeria de fotos/vídeos
create table if not exists gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text,
  image_url text,
  category text,
  is_video boolean default false,
  "order" integer default 0,
  created_at timestamptz default now()
);

-- 5. Depoimentos
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  photo_url text,
  quote text not null,
  "order" integer default 0,
  created_at timestamptz default now()
);

-- ============================================================================
-- Row Level Security (RLS)
-- Leitura pública (o site é institucional, todo mundo pode ver o conteúdo).
-- Escrita: por enquanto liberada para qualquer usuário autenticado, já que o
-- painel /admin usa login próprio (usuário/senha fixos), não o Supabase Auth.
-- Se depois você quiser travar a escrita, troque a policy de INSERT/UPDATE/
-- DELETE para checar uma tabela de admins, ou mova o CRUD para uma Edge
-- Function que valida a sessão do painel.
-- ============================================================================

alter table site_settings enable row level security;
alter table carousel_slides enable row level security;
alter table courses enable row level security;
alter table gallery_items enable row level security;
alter table testimonials enable row level security;

create policy "Leitura pública" on site_settings for select using (true);
create policy "Leitura pública" on carousel_slides for select using (true);
create policy "Leitura pública" on courses for select using (true);
create policy "Leitura pública" on gallery_items for select using (true);
create policy "Leitura pública" on testimonials for select using (true);

create policy "Escrita liberada (admin via painel proprio)" on site_settings for all using (true) with check (true);
create policy "Escrita liberada (admin via painel proprio)" on carousel_slides for all using (true) with check (true);
create policy "Escrita liberada (admin via painel proprio)" on courses for all using (true) with check (true);
create policy "Escrita liberada (admin via painel proprio)" on gallery_items for all using (true) with check (true);
create policy "Escrita liberada (admin via painel proprio)" on testimonials for all using (true) with check (true);

-- ============================================================================
-- Storage: bucket público para as imagens do site (logo, fotos, carrossel...)
-- ============================================================================

insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

create policy "Leitura pública das imagens"
  on storage.objects for select
  using (bucket_id = 'site-images');

create policy "Upload liberado (admin via painel proprio)"
  on storage.objects for insert
  with check (bucket_id = 'site-images');

create policy "Delete liberado (admin via painel proprio)"
  on storage.objects for delete
  using (bucket_id = 'site-images');

-- Seed inicial com os textos padrão (rode uma vez só)
insert into site_settings (contact_email, contact_phone, contact_address, about_title, about_text_1, about_text_2, about_text_3, about_quote, mission_text, vision_text, purpose_text, founder_name, founder_bio_1, founder_bio_2, founder_quote, footer_text)
select
  'contato@transformadas.org',
  '(41) 99999-9999',
  'São José dos Pinhais, PR — Brasil',
  'Da sala de casa ao Paraná',
  'Tudo começou há 7 anos atrás, na simplicidade de uma sala de estar em São José dos Pinhais, onde o desejo de ver Deus restaurar vidas superava as limitações de espaço.',
  'O Senhor abençoou, e depois do primeiro encontro vieram cultos, retiros e conferências. Ao ver mulheres tendo suas identidades restauradas em Deus, surgiu a necessidade de gerar também a restauração social.',
  'Foi então que surgiu a ideia da Associação Mulheres Transformadas para Transformar.',
  'A transformação de uma mulher não termina nela; ela se espalha para sua família, alcança sua comunidade e toca muitas outras vidas.',
  'Promover a transformação integral de mulheres e adolescentes, por meio de acolhimento, cuidado emocional, fortalecimento familiar, desenvolvimento pessoal e capacitação profissional.',
  'Ser uma organização reconhecida por transformar vidas, fortalecer famílias e desenvolver mulheres, impactando a sociedade de forma positiva.',
  'Acolher mulheres em vulnerabilidade, fortalecer emocionalmente e espiritualmente, restaurar famílias e incentivar o crescimento profissional e pessoal.',
  'Benedita Lima',
  'Nascida no Maranhão, Benedita Lima trouxe consigo a força e a determinação de quem desbrava novos horizontes. Sua jornada pessoal é o alicerce de resiliência sobre o qual o projeto foi construído.',
  'Com uma visão centrada no próximo, estabeleceu no Paraná um legado de acolhimento. Sua liderança não se impõe, mas se manifesta através do serviço incansável às mulheres, promovendo crescimento espiritual e pessoal.',
  'Benedita é o testemunho vivo de que a transformação é possível. Sua história de superação inspira centenas de mulheres a buscarem sua própria renovação e dignidade.',
  'Associação de mulheres que crescem, estudam, trabalham e nunca perdem a identidade. Da sala de casa ao Paraná — uma jornada de fé e transformação.'
where not exists (select 1 from site_settings);

-- ============================================================================
-- Se você já rodou este schema antes (site já existente) e só precisa
-- adicionar a tabela de Depoimentos, rode apenas o bloco abaixo:
-- ============================================================================
-- create table if not exists testimonials (
--   id uuid primary key default gen_random_uuid(),
--   name text not null,
--   role text,
--   photo_url text,
--   quote text not null,
--   "order" integer default 0,
--   created_at timestamptz default now()
-- );
-- alter table testimonials enable row level security;
-- create policy "Leitura pública" on testimonials for select using (true);
-- create policy "Escrita liberada (admin via painel proprio)" on testimonials for all using (true) with check (true);
