-- MovieZone database setup. Run in the Supabase SQL Editor.

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 20),
  avatar text not null default 'red',
  created_at timestamptz not null default now()
);
create index profiles_user_id_idx on public.profiles (user_id);
alter table public.profiles enable row level security;
create policy "Users manage own profiles"
  on public.profiles for all to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
grant select, insert, update, delete on public.profiles to authenticated;

create table public.watchlist (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  movie_id integer not null,
  title text not null,
  poster_path text,
  created_at timestamptz not null default now(),
  unique (profile_id, movie_id)
);
create index watchlist_profile_idx on public.watchlist (profile_id, created_at desc);
alter table public.watchlist enable row level security;
create policy "Users read own watchlist"
  on public.watchlist for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "Users add to own profile watchlist"
  on public.watchlist for insert to authenticated
  with check (
    (select auth.uid()) = user_id
    and exists (
      select 1 from public.profiles p
      where p.id = profile_id and p.user_id = (select auth.uid())
    )
  );
create policy "Users remove from own watchlist"
  on public.watchlist for delete to authenticated
  using ((select auth.uid()) = user_id);
grant select, insert, delete on public.watchlist to authenticated;