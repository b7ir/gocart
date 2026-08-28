'use client'
'use client'
import React from 'react'
import Title from './Title'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'
import { useLanguage } from '@/lib/i18n/LanguageContext'

const LatestProducts = () => {

    const { t } = useLanguage()
    const displayQuantity = 4
    const products = useSelector(state => state.product.list)

    return (
        <div className='px-6 my-30 max-w-6xl mx-auto'>
            <Title title={t('latest_products_title')} description={t('showing_of_products', { shown: products.length < displayQuantity ? products.length : displayQuantity, total: products.length })} href='/shop' />
            <div className='mt-12 grid grid-cols-2 sm:flex flex-wrap gap-6 justify-between'>
                {products.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, displayQuantity).map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    )
}

export default LatestProducts