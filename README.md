# Transformadas para Transformar

Site institucional da associação, com painel administrativo para editar
configurações, carrossel, cursos e galeria.

Este projeto foi migrado da plataforma **base44** para rodar de forma
independente, usando **Supabase** (banco de dados + storage + autenticação).

## Rodando local

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Configure o Supabase:
   - Copie `.env.example` para `.env.local`
   - Preencha `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` com os dados do
     seu projeto (Dashboard do Supabase -> Project Settings -> API)

3. Crie as tabelas e o bucket de imagens no Supabase:
   - Abra o **SQL Editor** no Dashboard do Supabase
   - Cole e rode todo o conteúdo de `supabase/schema.sql`

4. (Opcional, mas necessário para o login com Google) Ative o provedor
   Google em **Authentication -> Providers** no Dashboard do Supabase.

5. Rode o projeto:
   ```bash
   npm run dev
   ```

## Painel administrativo

Acesse `/admin/login`. O painel usa um login próprio (usuário/senha fixos,
guardado em `localStorage`) — independente do cadastro de usuários do site,
que usa Supabase Auth.

## Estrutura

- `src/pages/` — páginas do site (home, login, cadastro) e do painel `/admin`
- `src/components/` — componentes de UI e seções do site
- `src/hooks/useSiteContent.js` — busca o conteúdo editável do site no Supabase
- `src/lib/supabaseClient.js` — cliente do Supabase
- `src/lib/AuthContext.jsx` — autenticação de usuários do site (Supabase Auth)
- `supabase/schema.sql` — schema do banco de dados e do storage

## Próximos passos

- **Doações via Stripe**: ainda rodavam como funções serverless no base44.
  Ficaram arquivadas em `future-stripe-migration/` com instruções de como
  recriá-las como Supabase Edge Functions.
- **Imagens antigas**: alguns textos padrão podem referenciar imagens que
  ainda estão hospedadas no CDN do base44 (`media.base44.com`). Recomendado
  baixar essas imagens e subir de novo pelo próprio painel `/admin`, que já
  salva no Supabase Storage.
