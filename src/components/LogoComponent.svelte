<!-- LogoComponent.svelte -->
<script>
    export let logoUrl = '../../favicon.png';
    export let altText = 'Newkid Logo';
</script>

<div class=" uppercase pr-8">
    <div class="max-w-sm">
        <a href="/" class="block mb-5">
            <img src={logoUrl} alt={altText} class="h-16">
        </a>
    </div>
</div>
