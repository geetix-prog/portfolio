import type { APIRoute } from 'astro';
import { createContact } from '../../../backend/backend.mjs';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    
    if (!data.nom || !data.email || !data.message) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Tous les champs sont requis." 
        }), 
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "L'adresse email n'est pas valide." 
        }), 
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const result = await createContact({
      nom: data.nom,
      email: data.email,
      message: data.message
    });

    if (result.success) {
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Votre message a été envoyé avec succès !" 
        }), 
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } else {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Une erreur est survenue. Veuillez réessayer." 
        }), 
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  } catch (error) {
    console.error('Erreur API contact:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Une erreur est survenue lors de l'envoi du message." 
      }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};