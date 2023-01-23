// @ts-nocheck
import { invalid, redirect } from "@sveltejs/kit"
import { auth } from '$lib/firebase/admin';
// import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoadEvent } from './$types';
import { firestore } from '$lib/firebase/admin';

export async function load({ cookies }: LayoutServerLoadEvent) {
  
const db = firestore
const productSnap = await db.collection('contacts').get()
const productsData = productSnap.docs.map(doc => {
  return {
    uuid: doc.id,
    ...doc.data()
  }
})

try {
  const token = cookies.get('token');
  const user = token ? await auth.verifyIdToken(token) : null;

  return {
    uid: user?.uid,
    contacts: productsData
  };
} catch (err) {

  cookies.set('token', '', { maxAge: -1 });
  redirect(307, '/');
}

}


let contacts = [
  {
    id: 'de393e6a-1c08-4e6e-9aad-0994fcf0d981',
    name: 'Saul Goodman',
    email: 'saul@example.com',
    company: 'Saul Goodman & Associates',
    job: 'Attorney'
  }
]

// export const load = () => {
//   return {
//     contacts
//   }
// }

export const actions = {
  create: async ({ request }) => {
    const formData = await request.formData()
    
    const name = formData.get('name')
    const email = formData.get('email')
    const company = formData.get('company')
    const job = formData.get('job')
    

    if (name.length < 2) {
      return invalid(400, {
        error: true,
        message: 'Name must be at least two characters.',
        name,
        email,
        company,
        job
      })
    }

    const id = crypto.randomUUID()
    const contact = {
      id,
      name,
      email,
      company,
      job
    }
    
    const docRef = firestore.collection('contacts').doc(id);
    await docRef.set(contact);
    // contacts.push(contact)

    throw redirect(303, '/contacts')

  },

  delete: async ({ request }) => {
    const formData = await request.formData()
    const id = formData.get('id')
    // const uuid = formData.get('uuid')
     const docRef = firestore.collection('contacts').doc(id);
     docRef.delete()
     const db = firestore
     const productSnap = await db.collection('contacts').get()
     const productsData = productSnap.docs.map(doc => {
       return {
         uuid: doc.id,
         ...doc.data()
       }
      })
      contacts = contacts.filter(contact => contact.id != id)
      
   
    // console.log('id',id)
    return {
      success: true,
      contacts: productsData
    }
  }
}