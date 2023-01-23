<script>
	import { user } from '$lib/stores/auth';
	import { page } from '$app/stores';
	import { auth } from '$lib/firebase/client';
    import {signInWithEmailAndPassword } from 'firebase/auth';
    
    
        let email = '';
        let password = '';
    
        
    
        if ($user) {
            console.log('bingo',$page.data.uid)
        }
        async function logOut() {
        return auth.signOut();
    }
        async function logIn() {
        await signInWithEmailAndPassword(auth, email, password)
        
    }

	
</script>

<!-- {#if $user}
	{$user.displayName} ({$page.data.uid})
	<button on:click={() => signOut()}>Log out</button>
{:else}
	Not logged in.
	<button on:click={() => signIn()}>Log in</button>
{/if} -->

{#if $user}
{$user.email}
<button on:click={() => logOut()}>Log out</button>
{:else}
Not logged in.
<div on:click="{logIn}" on:keydown><button>Send</button></div>
<div class="container">
	<div class="did-floating-label-content">
	  <input class="did-floating-input" name="email" type="email" bind:value="{email}" >            
	  <label for="email"  class="did-floating-label">Email</label>
	</div>
	<div class="did-floating-label-content">
		<input class="did-floating-input" name="password" type="password" bind:value="{password}">            
		<label for="email" class="did-floating-label">Password</label>
	  </div>
	</div>	
{/if}

<style lang="scss">
	:root {
	  --ideal-viewport-width: 1920;
	}
	@function scaleValue($value) {
	  @return calc(
		#{$value} * (clamp(350px, 100vw, 2560px) / var(--ideal-viewport-width))
	  );
	}
 
	$control-margin-top: #{scaleValue(0)};  
 
	
   $control-width: #{scaleValue(100)};  
   $control-height: #{scaleValue(40)};  
   $control-line-height: #{scaleValue(40)};  
   $control-radius: #{scaleValue(8)};  
   $control-font-size: #{scaleValue(18)};  
 
 
 .container{
 width: 460px;
 padding: 20px;
 font-family: 'Inter', sans-serif;
 }
 
 .did-floating-label-content { 
 position:relative; 
 margin-bottom:20px; 
 }
 .did-floating-label {
 color:#1e4c82; 
 font-size:13px;
 font-weight:normal;
 position:absolute;
 pointer-events:none;
 left:15px;
 top:11px;
 padding:0 5px;
 background:#fff;
 transition:0.2s ease all; 
 -moz-transition:0.2s ease all; 
 -webkit-transition:0.2s ease all;
 }
 .did-floating-input {
 font-size:20px;
 display:block;
 width:100%;
 height:36px;
 padding: 0 20px;
 background: #fff;
 color: #323840;
 border: 1px solid #3D85D8;
 border-radius: 4px;
 box-sizing: border-box;
 &:focus{
   outline:none;
   ~ .did-floating-label{
	 top:-8px;
	 font-size:13px;
   }
 }
 }
   button{ 
   background: #18d38f;
   width: $control-width;
   height: $control-height;
   font-size: $control-font-size;
   line-height: $control-line-height;
   margin-top: $control-margin-top;
   font-weight: 600 ;
   color: white;
   border-radius: $control-radius; 
   padding: 0;
   border: 0;
   }
 </style>
