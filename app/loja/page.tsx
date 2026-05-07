"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Image from "next/image";
import { ShoppingBag, Loader2 } from "lucide-react";
import { Sheet } from "@/components/ui/sheet";
const CartDrawer = dynamic(() => import("@/components/loja/CartDrawer"), { ssr: false, loading: () => null });
import { CartProvider, useCart } from "@/components/loja/CartContext";
import { supabase } from "@/lib/supabase";
import { categoriasProduto, type CategoriaProduto } from "@/lib/data/produtos";
import { toast } from "sonner";

interface Produto {
  id: string;
  nome: string;
  descricao: string | null;
  preco: number;
  categoria: CategoriaProduto;
  imagem: string | null;
  destaque: boolean;
  estoque: number;
  ativo: boolean;
}

function ProdutoCard({ produto }: { produto: Produto }) {
  const { add } = useCart();
  const handleAdd = () => {
    add({
      id: produto.id,
      nome: produto.nome,
      descricao: produto.descricao ?? "",
      preco: produto.preco,
      categoria: produto.categoria,
      imagem: produto.imagem ?? "",
      estoque: produto.estoque,
    });
    toast.success(`${produto.nome} adicionado ao carrinho`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group bg-[#272727] rounded-sm ring-1 ring-white/5 overflow-hidden hover:ring-[#B8B8B8]/30 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        {produto.imagem ? (
          <Image
            src={produto.imagem}
            alt={produto.nome}
            width={400}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
            <ShoppingBag size={32} className="text-[#B8B8B8]/30" />
          </div>
        )}
        <div className="absolute inset-0 bg-[#B8B8B8]/8 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {produto.destaque && (
          <div className="absolute top-3 left-3 bg-[#B8B8B8] text-[#111111] text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5 rounded-sm">
            Destaque
          </div>
        )}
        {produto.estoque < 10 && (
          <div className="absolute top-3 right-3 bg-[#111111]/80 text-[#f5f0eb] text-[10px] font-medium px-2 py-0.5 rounded-sm">
            Últimas {produto.estoque} unidades
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-[10px] tracking-widest uppercase text-[#B8B8B8] mb-1 font-medium">
          {categoriasProduto.find((c) => c.value === produto.categoria)?.label}
        </p>
        <h3 className="font-medium text-[#f5f0eb] text-sm mb-1 line-clamp-1 group-hover:text-[#B8B8B8] transition-colors duration-200">
          {produto.nome}
        </h3>
        <p className="text-[#a8a8a8] text-xs leading-relaxed mb-4 line-clamp-2">
          {produto.descricao}
        </p>

        <div className="flex items-center justify-between">
          <p className="font-display text-2xl text-[#B8B8B8]">R$ {produto.preco}</p>
          <button
            onClick={handleAdd}
            disabled={produto.estoque === 0}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#B8B8B8] text-[#111111] text-xs font-semibold tracking-wider uppercase rounded-sm hover:bg-[#D4D4D4] active:bg-[#888888] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8B8B8] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ShoppingBag size={12} />
            {produto.estoque === 0 ? "Esgotado" : "Adicionar"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function LojaContent() {
  const [filtro, setFiltro] = useState<CategoriaProduto | "todos">("todos");
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const { count } = useCart();

  useEffect(() => {
    supabase
      .from("produtos")
      .select("*")
      .eq("ativo", true)
      .order("nome")
      .then(({ data }) => {
        setProdutos(data ?? []);
        setLoading(false);
      });
  }, []);

  const filtrados =
    filtro === "todos" ? produtos : produtos.filter((p) => p.categoria === filtro);

  return (
    <div className="min-h-screen bg-[#0c0c0c]">
      {/* Background */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B8B8B8]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-20 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-px bg-[#B8B8B8]" />
              <span className="text-xs font-medium tracking-[0.25em] uppercase text-[#B8B8B8]">
                Produtos oficiais
              </span>
            </div>
            <h1 className="font-display text-[clamp(40px,6vw,80px)] text-[#f5f0eb] leading-[0.9] tracking-tight">
              NOSSA
            </h1>
            <h1 className="font-display text-[clamp(40px,6vw,80px)] text-[#B8B8B8] leading-[0.9] tracking-tight">
              LOJA
            </h1>
          </div>

          {/* Cart */}
          <Sheet>
            <CartDrawer />
          </Sheet>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-[#B8B8B8] animate-spin" />
          </div>
        ) : (
          <>
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setFiltro("todos")}
                className={`px-4 py-2 text-xs tracking-widest uppercase font-medium rounded-sm ring-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8B8B8] ${
                  filtro === "todos"
                    ? "bg-[#B8B8B8] text-[#111111] ring-[#B8B8B8]"
                    : "bg-[#272727] text-[#a8a8a8] ring-white/5 hover:ring-[#B8B8B8]/30 hover:text-[#f5f0eb]"
                }`}
              >
                Todos ({produtos.length})
              </button>
              {categoriasProduto.map((cat) => {
                const cnt = produtos.filter((p) => p.categoria === cat.value).length;
                return (
                  <button
                    key={cat.value}
                    onClick={() => setFiltro(cat.value)}
                    className={`px-4 py-2 text-xs tracking-widest uppercase font-medium rounded-sm ring-1 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8B8B8] ${
                      filtro === cat.value
                        ? "bg-[#B8B8B8] text-[#111111] ring-[#B8B8B8]"
                        : "bg-[#272727] text-[#a8a8a8] ring-white/5 hover:ring-[#B8B8B8]/30 hover:text-[#f5f0eb]"
                    }`}
                  >
                    {cat.label} ({cnt})
                  </button>
                );
              })}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filtrados.map((produto) => (
                <ProdutoCard key={produto.id} produto={produto} />
              ))}
            </div>

            {filtrados.length === 0 && (
              <div className="text-center py-16">
                <p className="text-[#a8a8a8]">Nenhum produto encontrado.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function LojaPage() {
  return (
    <CartProvider>
      <LojaContent />
    </CartProvider>
  );
}
