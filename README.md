This repo is entirely the work of [blog post](https://jeroenpelgrims.com/access-the-firebase-auth-user-in-sveltekit-server-side/) on accessing the Firebase user in the SvelteKit backend.
I just added Hunter's form actions @ https://www.youtube.com/watch?v=EQy-AYhZIlE&t=0s for realtime CRUD with firestore minus the update bit. I also added sign in with email and password NB* I didn't bother adding signup *** so  you  need to add your own user in firebase auth. I also added some regx to the private key as cloudflare and Vercel will throw an error otherwise(I finally gave up with cloudflare after fixing the private key error as Cloudflare promptly dumped another precisely 161 errors on me!!) .This version will build locally but I could not get a deploy out of Cloudflare . I tested server side locally with ngrok and it works suprisingly really well considering my phone is my internet and I am in the sticks. If you do try and deploy on cloudflare you will need to add your env variables again in the cloudflare dashboard. 'dnotes' in the discord recommended Vercel to me 
 My first deploy on Vercel was frictionless and Auth worked  but  firebase-admin sdk with firestore and the realtime database returned a mysterious 500 internal error and I didn't have a clue where it was coming from. In dev tools you could see the request going out but nothing would come back. I then followed Rich Harris's ,top man , instructions on his Vercel Edge template where he uses the Vercel adapter and deploys the app to vercel using cli again failure with only auth working. At this point I thought I should read some documentation and now I know the errors are specifically related to Vercel service workers as they use websockets! which is just what I need but when used on the 'Edge' they don't retain state so cannot return anything!  This is exactly the same problem that is happening on Cloudflare , in cloudflare  for sockets to retain state  they need a 'durable object' which requires upgrading to a paid plan. I was letting 'dnotes' know how I got on and as I was typing I had a bit of an epiphany, I thought to myself 'I could just turn 'Edge' off', so I had another go turned 'Edge' off in svelte.config and like magic the whole thing came to life silky smooth hydration, updates and deletes.
 All credit to Jeroen Pelgrims top man  and Hunter for his form-actions tutorial another top man. 
 


To get this example running it should be enough to do the following steps:

- Clone this repo
- run `npm install`
- Create a `.env` file with the correct values.
  (Check `.env.sample` for the variables you need to set)