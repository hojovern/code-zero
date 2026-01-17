<script>
    import { Info } from 'lucide-svelte';
    let { text } = $props();
</script>

<div class="relative group inline-flex items-center ml-2 align-middle">
    <Info class="w-4 h-4 text-slate-300 hover:text-slate-500 cursor-help transition-colors" />
    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-slate-900 text-white text-[10px] font-medium leading-relaxed rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl z-50 text-center pointer-events-none">
        {text}
        <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
    </div>
</div>
