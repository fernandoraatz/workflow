/*
|--------------------------------------------------------------------------
| Service Worker
|--------------------------------------------------------------------------
*/

// Import modules

import { Database } from '../models/db';

// Instantiate

let database = new Database();

// Start DB

database.start();


// Constants

const CACHE_NAME = 'v1.0.1';
const FILES = [
    './',
    './style-bundle.css',
    './app_bundle.js'
]

// Install event

self.addEventListener('install', function(event){

  console.log('[v] Successfully installed service worker');

  // Cacheando os nosso arquivos e determinando sua versao
  event.waitUntil(
          caches.open(CACHE_NAME).then(function(cache){
          return cache.addAll(FILES);
      })
  )
})

// Activate event

self.addEventListener('activate', function(event){

  console.log('[v] Successfully activated service worker'); 

  // Deletando os caches antigos
  event.waitUntil(
      caches.keys().then(function (keys) {
          return Promise.all(keys
              .filter(function (key) {
                  return key.indexOf(CACHE_NAME) !== 0;
              })
              .map(function (key) {
                  return caches.delete(key);
              })
          );
      })
  );
})

// Fetch event

self.addEventListener('fetch', function(event){
  // Verifica se existe um cache na requisição que fizemos
  // Se existir retorna do cache, senao uma comum
  event.respondWith(
      caches.match(event.request).then(function(response){
          return response || fetch(event.request);
      })
  )
})

function sendItems(){
  return database.start().then( db => {
        db.findAll('local').then( items => {
            database.postServer(items)
        });
    })
}

// Sync to server

self.addEventListener('sync', function(event){
  console.log(event.tag)
    if(event.tag === 'newItem' || event.tag === 'test-tag-from-devtools' ){
        event.waitUntil(sendItems())
        console.log('[v] Successfully send itens with service worker');
    }
})
