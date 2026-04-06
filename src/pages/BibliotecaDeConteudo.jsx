import React from 'react';

export default function BibliotecaDeConteudo() {
  return (
    <>
      <div className="space-y-6 stagger-children max-w-[1400px] mx-auto w-full">
        {/* Header Action Row - Compact */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 md:gap-4">
          <div>
            <h3 className="text-xl font-extrabold text-gradient-primary">Meus Conteúdos</h3>
            <p className="text-on-surface-variant text-[13px] mt-0.5">Gerencie seus materiais de estudo.</p>
          </div>
          <div className="flex gap-2 sm:gap-2.5">
            <button className="flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-lg border border-outline-variant/30 text-primary-container font-bold hover:bg-blue-50 hover:border-primary-container/20 transition-all active:scale-[0.98] text-[12px] md:text-[13px]">
              <span className="material-symbols-outlined text-lg">create_new_folder</span>
              <span className="text-[13px]">Pasta</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-lg action-gradient text-white font-bold shadow-glow-orange hover:scale-[1.02] active:scale-[0.98] transition-all text-[12px] md:text-[13px]">
              <span className="material-symbols-outlined text-lg">upload</span>
              <span className="text-[13px]">Upload</span>
            </button>
          </div>
        </div>

        {/* Filter Tags - Compact */}
        <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pb-1">
          {[
            { label: 'Todos', active: true },
            { label: 'Documentos (12)', active: false },
            { label: 'Vídeos (5)', active: false },
            { label: 'Áudios (3)', active: false },
            { label: 'Links (8)', active: false },
            { label: '⭐ Favoritos', active: false },
          ].map((filter) => (
            <button
              key={filter.label}
              className={`px-4 py-1.5 rounded-full font-semibold whitespace-nowrap text-[12px] transition-all active:scale-[0.98] ${
                filter.active
                  ? 'action-gradient text-white shadow-sm'
                  : 'bg-white text-primary-container hover:bg-blue-50 border border-outline-variant/20 hover:border-primary-container/20'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Bento Grid Library - Compact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 stagger-children">
          {/* Folder Cards */}
          {[
            { name: 'Código Fonte e Algoritmos', files: 24, edited: 'há 2h' },
            { name: 'Engenharia de Software', files: 15, edited: '1 dia' },
          ].map((folder) => (
            <div key={folder.name} className="bg-white p-4 rounded-xl flex flex-col gap-3 shadow-premium card-interactive group">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-primary-container transition-all duration-300">
                  <span className="material-symbols-outlined text-xl text-primary-container group-hover:text-white transition-colors" style={{ fontVariationSettings: "'FILL' 1" }}>folder</span>
                </div>
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-primary-container">more_vert</span>
              </div>
              <div>
                <h4 className="font-bold text-[14px] text-primary-container truncate">{folder.name}</h4>
                <p className="text-[11px] text-on-surface-variant mt-0.5">{folder.files} arquivos • {folder.edited}</p>
              </div>
            </div>
          ))}

          {/* Featured Card - Spans 2 columns on larger screens */}
          <div className="sm:col-span-2 relative bg-white rounded-xl shadow-premium-lg group card-hover overflow-hidden flex">
             <div className="absolute top-2 left-2 z-10">
              <span className="action-gradient text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm">Novo</span>
            </div>
            <div className="w-2/5 aspect-square relative overflow-hidden">
                <img className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_5L8XexuOgo23e8BvdoxYUHBYYiJ0K1hbXy71GbLqoWR7KWNpTwYTsH4QiEs734_6poRPoN0FW013UCr7-SmCyFYaQx2Q5F6mCftojoLzytXqtI7omwtd7XKR8C-kvfcTjPrw9d-m7Ofy-NeGy4OriGHPU_3wBJf_8BsfXXoza1GfFMx-cZVvpz9hamR2n84wdG8v8GuJBdnktDznIyysBE6IVbEjs66B4e_7tKyW9g7jkVfFI-oABVaMLSNmOpUIgkC4HkyzEyo" alt="Book" />
            </div>
            <div className="w-3/5 p-4 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <span className="material-symbols-outlined text-orange-500 text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                        <span className="material-symbols-outlined text-[18px] text-on-surface-variant/40 hover:text-orange-500 cursor-pointer transition-colors">star_outline</span>
                    </div>
                    <h4 className="font-bold text-[13px] text-primary-container leading-snug line-clamp-2">Resumo: Sistemas Distribuídos e Microsserviços</h4>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">PDF • 12MB</span>
                    <button className="p-1.5 bg-surface-container-low rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-all active:scale-[0.98]">
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    </button>
                </div>
            </div>
          </div>

          {/* Standard Content Cards */}
          {[
            { title: 'Aula 4: Criptografia', type: 'Vídeo • 45m', icon: 'video_library', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDatspO1gjce5EwqGEletoetqgk1C5sqzT-1WYuQliILSuCEcpPuCX54W14Kh1xflp-VsjTvvECIuPKsfyj_97vY_yR_Empv2Lc-Rypszs-x7lydNJEL0zyP0qRrYZ9tVIqn67rZWoap542h0ZNUvtvAbdrwleD4gg5KHTsLTDexo49z_0N4rOpLsElF4UYupaIXHV4HT5SdL4Z8Tx5xAn1X8q-ggeIKCeY7GeWXBAKdYI2dnw-jnmahGaOvYT2nFrvyG8FRf9-7ns' },
            { title: 'Notas de Arq. Limpa', type: 'Doc • 4pags', icon: 'article', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAF_77TzAe0LLEhyl8hnPRXjP8zHIRjJ9zJB4I5sZWykaZ2WSf-vcNSF1uz34G39e6nelRQJSI23qVQ3lncyp5Rrd6J1NmtFNstG-77uIuwD7CKMVczR3r6of-QVfSJJ9rDkI1uRJAS9hFTC_RgDajMX9B-9herLNER02XVYWIl011OHUo5PGCS8J2nyMnEqOrF2NHb5WDcue9BtzLJaM4R_UzJ6Bk3DHQTx6nbbfv5FNZAnvPrkz3m6exltI03XpnIyz2rSGHIRCo' },
            { title: 'Ref: Docs de React', type: 'Link Externo', icon: 'link', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4VYyJLnFTnXI-9Zd47dCOCtUJC4apVIDp0bYKlFQrZxQbxlRlJ0m3cmNKFRu_7xME8BrqsgE50lzxLNmPyu6xx1IlW9NKGgaIUp299VaP9j6CGDz2gIAUWGXSQ5DK9ygdAUXeBmGZuA8G3rF2xl0p6sybxhi641dweKH_EPGyHVxUB2WLM0mU2g4-TJk5n2G4HaebcxBpzueB2in-c-0BH0lodRaNj-Gg-A32g4K9992qsB2aHa1fiURAHMIDPff3FSypeGqyFY8' },
            { title: 'Grupo Hackathon', type: 'Pasta Compartilhada', icon: 'star', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7J7vayZfktOHyO_WkCNn8JEBOEBjM60SDu3xwkLJjjKkw2qPyLWUA1jCJjoRQDBoK3EXLXUdxTlIZoklT41RBnk7tBs5U9bcasjoY86AWMR9phoq-Di7TbZ1J-ki70IyLVCsRuwVHTeQDhqOJkqpAjX9GLbn6tcPP_y0FhO9YtOKGFwp5bfBBszgrvRzIaaHMemLu8ozDmXP2dqzS6YkM9hs9Sok0xVtrTy2omJAVcR54Wp8UakueQinwUE47_BTG1lyE0FjvgT4' },
          ].map((card) => (
            <div key={card.title} className="bg-white rounded-xl shadow-premium card-interactive group overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={card.img} alt={card.title} />
              </div>
              <div className="p-3">
                <div className="flex justify-between items-start mb-1.5">
                  <span className={`material-symbols-outlined text-[16px] ${card.icon === 'star' ? 'text-orange-500' : 'text-primary-container/60'}`} style={card.icon === 'star' ? { fontVariationSettings: "'FILL' 1" } : {}}>{card.icon}</span>
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-primary-container">more_vert</span>
                </div>
                <h4 className="font-bold text-[13px] text-primary-container leading-tight truncate">{card.title}</h4>
                <p className="text-[10px] text-on-surface-variant mt-1 truncate">{card.type}</p>
              </div>
            </div>
          ))}

          {/* Add Placeholder Card */}
          <div className="border-2 border-dashed border-outline-variant/40 rounded-xl flex flex-col items-center justify-center p-6 text-on-surface-variant hover:bg-orange-50/50 hover:border-orange-300 transition-all cursor-pointer group active:scale-[0.98]">
            <div className="w-10 h-10 rounded-lg bg-surface-container-low group-hover:bg-orange-100 flex items-center justify-center mb-2 transition-all">
              <span className="material-symbols-outlined text-[20px] group-hover:text-orange-600 transition-colors">add_circle</span>
            </div>
            <p className="font-bold text-[12px]">Adicionar Material</p>
            <p className="text-[10px] opacity-50 mt-0.5">PDF, Vídeo, Áudio</p>
          </div>
        </div>
      </div>
    </>
  );
}
