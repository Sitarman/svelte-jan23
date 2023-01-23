<script>
    import "../app.css";
  </script>
  <nav class=" pt-2 pb-1">
	<a class = " text-3xl text-emerald-400 transition ease-in-out delay-150  hover:bg-emerald-100 hover:-translate-y-1 hover:scale-105 hover:rounded-2xl pl-2 pr-2 hover:ring-offset-2  hover:text-emerald-600 duration-500" href="/">Home</a>
	<a class = " text-3xl text-emerald-400 transition ease-in-out delay-150  hover:bg-emerald-100 hover:-translate-y-1 hover:scale-105 hover:rounded-2xl pl-2 pr-2 hover:ring-offset-2  hover:text-emerald-600 duration-500" href="/contacts">Contacts</a>
</nav>
  <slot />

  <style>
	nav {
		display: flex;
	}
	nav a {
		margin-right: 1rem;
	}
</style>