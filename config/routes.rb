Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  
  #__PAGES CONTROLELR
  root to: 'pages#home'
  get 'about', to: 'pages#about'
  
  #___CONTACTS CONTROLLER
  resources :contacts, only: :create
  get 'contact-us', to: 'contacts#new', as: 'new_contact'
end
