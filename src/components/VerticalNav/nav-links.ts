import HomeIcon from '../Icons/HomeIcon'
import RentalIcon from '../Icons/RentalIcon'
import BookingIcon from '../Icons/BookingIcon'
import UsersIcon from '../Icons/UsersIcon'
import TagsIcon from '../Icons/TagsIcon'
import ArticleIcon from '../Icons/ArticleIcon'
import React from 'react'

// Enums
import { Roles } from '../../consts/roles'

export interface NavLinkProps {
  to: string
  Icon: React.ElementType
  label: string
  roles: Array<Roles>
}

export const navLinks: NavLinkProps[] = [
  {
    to: '/',
    Icon: HomeIcon,
    label: 'Accueil',
    roles: [Roles.collaborator],
  },
  {
    to: 'items/catalogue',
    Icon: RentalIcon,
    label: 'Location',
    roles: [Roles.collaborator],
  },
  {
    to: '/items/rentals',
    Icon: BookingIcon,
    label: 'Réservations',
    roles: [Roles.admin, Roles.storekeeper],
  },
  {
    to: '/admin/persons',
    Icon: UsersIcon,
    label: 'Magasiniers',
    roles: [Roles.admin],
  },
  {
    to: 'admin/tags',
    Icon: TagsIcon,
    label: 'Catégories & Tags',
    roles: [Roles.admin],
  },
  {
    to: 'admin/items',
    Icon: ArticleIcon,
    label: 'Articles',
    roles: [Roles.admin],
  },
]
