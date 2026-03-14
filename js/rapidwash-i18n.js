(function(window, document) {
    "use strict";

    var STORAGE_KEY = "rapidwash-language";

    function getLanguage() {
        var stored = null;
        try {
            stored = window.localStorage.getItem(STORAGE_KEY);
        } catch (error) {
            stored = null;
        }
        if (stored === "en") {
            return "en";
        }
        return "ar";
    }

    function setLanguage(lang) {
        var nextLanguage = lang === "en" ? "en" : "ar";
        try {
            window.localStorage.setItem(STORAGE_KEY, nextLanguage);
        } catch (error) {
            return;
        }
        window.location.reload();
    }

    function getMenuLabel(isOpen) {
        if (getLanguage() === "en") {
            return isOpen ? "Close menu" : "Open menu";
        }
        return isOpen ? "إغلاق القائمة" : "فتح القائمة";
    }

    function applyDirection(lang) {
        document.documentElement.lang = lang === "en" ? "en" : "ar";
        document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
        if (document.body) {
            document.body.setAttribute("data-lang", lang);
        }
    }

    function q(selector) {
        return document.querySelector(selector);
    }

    function qa(selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
    }

    function setText(target, value) {
        var element = typeof target === "string" ? q(target) : target;
        if (element) {
            element.textContent = value;
        }
    }

    function setHtml(target, value) {
        var element = typeof target === "string" ? q(target) : target;
        if (element) {
            element.innerHTML = value;
        }
    }

    function setAttr(target, name, value) {
        var element = typeof target === "string" ? q(target) : target;
        if (element) {
            element.setAttribute(name, value);
        }
    }

    function setTextList(selector, values) {
        qa(selector).forEach(function(element, index) {
            if (values[index] !== undefined) {
                element.textContent = values[index];
            }
        });
    }

    function setInnerTextList(root, selector, values, mode) {
        if (!root) {
            return;
        }
        Array.prototype.slice.call(root.querySelectorAll(selector)).forEach(function(element, index) {
            if (values[index] === undefined) {
                return;
            }
            if (mode === "html") {
                element.innerHTML = values[index];
                return;
            }
            element.textContent = values[index];
        });
    }

    function setMeta(selector, value) {
        var node = q(selector);
        if (node) {
            node.setAttribute("content", value);
        }
    }

    function applyEnglishGlobal() {
        document.documentElement.style.setProperty("--popular-card-label", "\"Popular\"");
        setAttr(".social-fb", "aria-label", "Facebook");
        setAttr(".social-google", "aria-label", "Google Maps");
        setAttr(".wa-float", "aria-label", "WhatsApp");
        setAttr(".btn-close-menu", "aria-label", "Close menu");
    }

    function buildSwitchers() {
        var lang = getLanguage();
        qa("[data-language-switcher]").forEach(function(container) {
            if (!container.dataset.ready) {
                container.innerHTML =
                    "<button type=\"button\" data-lang-option=\"ar\" aria-label=\"Arabic\">AR</button>" +
                    "<button type=\"button\" data-lang-option=\"en\" aria-label=\"English\">EN</button>";

                Array.prototype.slice.call(container.querySelectorAll("button")).forEach(function(button) {
                    button.addEventListener("click", function() {
                        var nextLanguage = button.getAttribute("data-lang-option");
                        if (nextLanguage !== getLanguage()) {
                            setLanguage(nextLanguage);
                        }
                    });
                });

                container.dataset.ready = "true";
            }

            Array.prototype.slice.call(container.querySelectorAll("button")).forEach(function(button) {
                var isActive = button.getAttribute("data-lang-option") === lang;
                button.classList.toggle("is-active", isActive);
                button.setAttribute("aria-pressed", isActive ? "true" : "false");
            });
        });
    }

    function applyIndexEnglish() {
        var serviceCards = qa(".service-card");
        var serviceLinks = qa(".service-link");
        var pricingNames = qa(".pricing-card-name");
        var pricingPrices = qa(".pricing-card-price");
        var heroProofCards = qa(".hero-proof-card");
        var heroMetrics = qa(".hero-metric");
        var blogCards = qa(".blog-card");
        var footerColumns = qa(".footer-col");

        document.title = "Rapid Wash | Laundry, Ironing, Pickup and Delivery in Ajman";
        setMeta("meta[name=\"description\"]", "Rapid Wash in Ajman offers laundry, ironing, carpet, blanket and curtain care with convenient pickup and delivery.");
        setMeta("meta[property=\"og:title\"]", "Rapid Wash | Laundry, Ironing, Pickup and Delivery in Ajman");
        setMeta("meta[property=\"og:description\"]", "Professional laundry and ironing with convenient pickup and delivery in Ajman, clear pricing and careful garment care.");
        setMeta("meta[property=\"og:image:alt\"]", "Rapid Wash logo");
        setMeta("meta[name=\"twitter:title\"]", "Rapid Wash | Laundry, Ironing, Pickup and Delivery in Ajman");
        setMeta("meta[name=\"twitter:description\"]", "Professional laundry and ironing with convenient pickup and delivery in Ajman, clear pricing and careful garment care.");

        setText(".skip-link", "Skip to content");
        setHtml(".nav-links .btn-close-menu", "<i class=\"fas fa-times\"></i> Close");
        setTextList(".nav-links a", ["Home", "Services", "About", "Gallery", "Blog", "Pricing", "Location"]);
        setHtml(".btn-header", "<i class=\"fas fa-phone-alt\"></i><span> Call Us</span>");

        setHtml(".hero-kicker span:nth-child(1)", "<i class=\"fas fa-truck\"></i> Free pickup & delivery");
        setHtml(".hero-kicker span:nth-child(2)", "<i class=\"fas fa-gem\"></i> Fabric-safe care");
        setHtml(".hero-tag", "<i class=\"fas fa-soap\"></i> Laundry, ironing and home textiles with a professional touch in Ajman");
        setHtml(".hero-content h1", "A polished look starts with <span>professional laundry</span> and precise ironing");
        setText(".hero-content > p", "Rapid Wash takes care of clothes, carpets, blankets and curtains with a clear service from pickup to delivery, so every item comes back cleaner, neater and ready to use.");
        setText(".hero-primary", "Order on WhatsApp");
        setText(".hero-secondary", "View Pricing");

        if (heroProofCards[0]) {
            setText(heroProofCards[0].querySelector("strong"), "Free pickup & delivery");
            setText(heroProofCards[0].querySelector("span"), "We arrange pickup and drop-off across Ajman with ease.");
        }
        if (heroProofCards[1]) {
            setText(heroProofCards[1].querySelector("strong"), "Fabric-specific care");
            setText(heroProofCards[1].querySelector("span"), "Laundry and ironing that protect shape and feel for longer.");
        }
        if (heroProofCards[2]) {
            setText(heroProofCards[2].querySelector("strong"), "Clear pricing");
            setText(heroProofCards[2].querySelector("span"), "Straightforward prices for daily and family care needs.");
        }

        setTextList(".hero-service-strip li", [
            "Laundry",
            "Professional ironing",
            "Carpets & rugs",
            "Blankets & duvets",
            "Curtains"
        ]);
        setHtml(".hero-stage-badge", "<i class=\"fas fa-star\"></i> Premium care from Rapid Wash");
        setText(".hero-info-top .hero-info-label", "Best choice");
        setText(".hero-info-top strong", "Wash + Iron");
        setText(".hero-info-top p", "Ideal for daily and formal wear.");
        setAttr(".hero-side-shot-top img", "alt", "Rapid Wash team member");
        setAttr(".hero-main-shot img", "alt", "Rapid Wash professional laundry and ironing service");
        setAttr(".hero-side-shot-bottom img", "alt", "Rapid Wash team member");
        setText(".hero-info-bottom .hero-info-label", "Visit us");
        setText(".hero-info-bottom strong", "Al Rashidiya 3, Ajman");
        setText(".hero-info-bottom a", "Open the location in Google Maps");

        if (heroMetrics[0]) {
            setText(heroMetrics[0].querySelector("strong"), "5 Services");
            setText(heroMetrics[0].querySelector("span"), "Core care options for clothes and home textiles.");
        }
        if (heroMetrics[1]) {
            setText(heroMetrics[1].querySelector("strong"), "Free");
            setText(heroMetrics[1].querySelector("span"), "Pickup and delivery that save you the trip.");
        }
        if (heroMetrics[2]) {
            setText(heroMetrics[2].querySelector("strong"), "Ajman");
            setText(heroMetrics[2].querySelector("span"), "Easy-to-reach location and responsive service.");
        }

        setHtml(".services-kicker", "<i class=\"fas fa-star\"></i> Our featured services");
        setText(".services-overview h2", "Complete care solutions for your clothes and home textiles");
        setText(".services-overview > p", "From daily wear to heavy household items, we manage a smooth service that starts with pickup and ends with a clean, tidy delivery that fits your daily routine.");
        setTextList(".services-overview-item strong", [
            "Easy, fast service",
            "Care matched to each item",
            "Clean, finished results"
        ]);
        setTextList(".services-overview-item span", [
            "Order directly on WhatsApp with pickup and delivery across Ajman.",
            "Laundry, ironing and cleaning tailored to different garments and textiles.",
            "We focus on cleanliness and final presentation so every item is ready to use."
        ]);
        setTextList(".services-stat span", [
            "Core services",
            "Pickup & delivery",
            "Coordination & ordering"
        ]);
        setText(q(".services-stat:nth-child(2) strong"), "Free");
        setText(q(".services-stat:nth-child(3) strong"), "Fast");
        setText(".services-overview-cta", "See our pricing");

        if (serviceCards[0]) {
            setText(serviceCards[0].querySelector(".service-media-tag"), "Daily & formal wear");
            setText(serviceCards[0].querySelector("h3"), "Laundry service");
            setText(serviceCards[0].querySelector(".service-card-title-group p"), "Daily care that keeps white and colored items fresh.");
            setText(serviceCards[0].querySelector(".service-copy"), "A practical service for everyday and formal garments, with attention to detail so each piece comes back clean, neat and ready to wear.");
            setInnerTextList(serviceCards[0], ".service-points li", [
                "Sorting by fabric and color.",
                "Cleaning that protects texture and final look.",
                "Great for daily and family orders."
            ]);
            setHtml(serviceCards[0].querySelector(".service-card-note"), "<i class=\"fas fa-clock\"></i> Easy daily service");
            setText(serviceCards[0].querySelector(".service-link span"), "Order service");
            setAttr(serviceLinks[0], "href", "https://wa.me/971524412009?text=I%20would%20like%20to%20request%20the%20laundry%20service");
        }

        if (serviceCards[1]) {
            setText(serviceCards[1].querySelector(".service-badge"), "Everyday elegance");
            setText(serviceCards[1].querySelector(".service-media-tag"), "Precise ironing");
            setText(serviceCards[1].querySelector("h3"), "Professional ironing");
            setText(serviceCards[1].querySelector(".service-card-title-group p"), "A clean finishing touch that makes every piece look ready.");
            setText(serviceCards[1].querySelector(".service-copy"), "We restore a sharp look and crisp feel, so garments look their best for everyday use, work and special occasions.");
            setInnerTextList(serviceCards[1], ".service-points li", [
                "A polished look for formal and everyday clothing.",
                "Fewer wrinkles with care that respects the fabric.",
                "A smart choice for workdays and meetings."
            ]);
            setHtml(serviceCards[1].querySelector(".service-card-note"), "<i class=\"fas fa-star\"></i> Great for workwear");
            setText(serviceCards[1].querySelector(".service-link span"), "Order service");
            setAttr(serviceLinks[1], "href", "https://wa.me/971524412009?text=I%20would%20like%20to%20request%20professional%20ironing");
        }

        if (serviceCards[2]) {
            setText(serviceCards[2].querySelector(".service-badge"), "Deep cleaning");
            setText(serviceCards[2].querySelector(".service-media-tag"), "Per-meter care");
            setText(serviceCards[2].querySelector("h3"), "Carpets & rugs");
            setText(serviceCards[2].querySelector(".service-card-title-group p"), "Cleaning that refreshes the overall look and feel.");
            setText(serviceCards[2].querySelector(".service-copy"), "A suitable service for carpets and rugs that removes signs of daily use and brings a fresher feel back to the space.");
            setInnerTextList(serviceCards[2], ".service-points li", [
                "Helps remove dust marks and visible stains.",
                "A cleaner feel for homes and offices.",
                "Clear pricing per meter."
            ]);
            setHtml(serviceCards[2].querySelector(".service-card-note"), "<i class=\"fas fa-ruler-combined\"></i> Priced per meter");
            setText(serviceCards[2].querySelector(".service-link span"), "Order service");
            setAttr(serviceLinks[2], "href", "https://wa.me/971524412009?text=I%20would%20like%20to%20request%20carpet%20and%20rug%20cleaning");
        }

        if (serviceCards[3]) {
            setText(serviceCards[3].querySelector(".service-badge"), "Home textiles");
            setText(serviceCards[3].querySelector(".service-media-tag"), "Fresh & clean");
            setText(serviceCards[3].querySelector("h3"), "Blankets & duvets");
            setText(serviceCards[3].querySelector(".service-card-title-group p"), "A comfortable service for heavy household items.");
            setText(serviceCards[3].querySelector(".service-copy"), "We care for blankets and duvets in a way that restores freshness and comfort, so they are ready again for daily use.");
            setInnerTextList(serviceCards[3], ".service-points li", [
                "Ideal for seasonal needs and larger home orders.",
                "Cleaning that improves the overall freshness of each piece.",
                "A practical service that saves time and effort."
            ]);
            setHtml(serviceCards[3].querySelector(".service-card-note"), "<i class=\"fas fa-layer-group\"></i> Ideal for seasonal use");
            setText(serviceCards[3].querySelector(".service-link span"), "Order service");
            setAttr(serviceLinks[3], "href", "https://wa.me/971524412009?text=I%20would%20like%20to%20request%20blanket%20and%20duvet%20laundry");
        }

        if (serviceCards[4]) {
            setText(serviceCards[4].querySelector(".service-badge"), "Full service");
            setText(serviceCards[4].querySelector(".service-media-tag"), "Remove, wash & reinstall");
            setText(serviceCards[4].querySelector("h3"), "Curtains");
            setText(serviceCards[4].querySelector(".service-card-title-group p"), "A practical curtain care solution from start to finish.");
            setText(serviceCards[4].querySelector(".service-copy"), "A convenient service for curtains that need complete care, with less effort on your side and a cleaner, neater finish for the space.");
            setInnerTextList(serviceCards[4], ".service-points li", [
                "Complete care that covers the essential steps.",
                "A practical choice for homes and offices.",
                "Helps the room look cleaner and more organized."
            ]);
            setHtml(serviceCards[4].querySelector(".service-card-note"), "<i class=\"fas fa-home\"></i> For homes and offices");
            setText(serviceCards[4].querySelector(".service-link span"), "Order service");
            setAttr(serviceLinks[4], "href", "https://wa.me/971524412009?text=I%20would%20like%20to%20request%20curtain%20cleaning");
        }

        setHtml(".pricing-eyebrow", "<i class=\"fas fa-tags\"></i> Laundry & ironing");
        setText(".pricing-overview h2", "Clear pricing and easy service from the first order");
        setText(".pricing-overview > p", "Choose the item you need and view pricing instantly, with free pickup and delivery in Ajman and fast ordering on WhatsApp any time.");
        setTextList(".pricing-benefit span", [
            "Free pickup and delivery across Ajman",
            "Laundry and ironing for clothes and home textiles",
            "Order quickly and send your details on WhatsApp"
        ]);
        setTextList(".pricing-highlight span", [
            "Popular daily items start from",
            "Full suit with careful pressing"
        ]);
        setHtml(".pricing-cta a:first-child", "<i class=\"fab fa-whatsapp\"></i> Order now on WhatsApp");
        setText(".pricing-secondary-link", "Find our location");
        setTextList(".pricing-strip span", [
            "Daily wear",
            "Formal wear",
            "Home textiles",
            "Clear pricing"
        ]);

        if (pricingNames.length >= 10 && pricingPrices.length >= 10) {
            setHtml(pricingNames[0], "T-Shirt & Trousers <span>Everyday set</span>");
            setText(pricingPrices[0], "AED 2.5");
            setHtml(pricingNames[1], "Abaya <span>Single piece</span>");
            setText(pricingPrices[1], "AED 6");
            setHtml(pricingNames[2], "Shirt <span>Pressed & cleaned</span>");
            setText(pricingPrices[2], "AED 2.5");
            setHtml(pricingNames[3], "Qandora <span>Traditional wear</span>");
            setText(pricingPrices[3], "AED 4");
            setHtml(pricingNames[4], "Bed Sheet <span>Small / Large</span>");
            setText(pricingPrices[4], "AED 4 small / 5 large");
            setHtml(pricingNames[5], "Blanket <span>Home textile</span>");
            setText(pricingPrices[5], "AED 12");
            setHtml(pricingNames[6], "Suit <span>Two-piece</span>");
            setText(pricingPrices[6], "AED 15");
            setHtml(pricingNames[7], "Veil <span>Shaila</span>");
            setText(pricingPrices[7], "AED 3");
            setHtml(pricingNames[8], "Carpet <span>Per meter</span>");
            setText(pricingPrices[8], "AED 8 / meter");
            setHtml(pricingNames[9], "Underwear <span>Single piece</span>");
            setText(pricingPrices[9], "AED 1");
        }

        setText(".pricing-footnote", "For items not listed or for custom orders, message us on WhatsApp and we will prepare the right service quickly.");
        setHtml(".about-intro-text h2", "About <span>Us</span>");
        setText(".about-intro-lead", "Rapid Wash provides laundry and ironing services with high standards and professional care.");
        setTextList(".about-intro-lines li", [
            "We protect the quality of clothes and home textiles using the best care methods.",
            "We offer free pickup and delivery for your convenience.",
            "Trust us to care for your items with high quality and close attention.",
            "We use modern techniques and safe cleaning products that protect fabrics and colors.",
            "Our team is carefully trained to deliver dependable results every time.",
            "We commit to timing and precision because your satisfaction comes first.",
            "Rapid Wash... lasting freshness and polished elegance."
        ]);
        setAttr(".about-img-main", "alt", "Rapid Wash professional laundry");
        setAttr(".about-img-secondary", "alt", "Rapid Wash laundry and ironing services");
        setTextList(".feature-item h4", [
            "Free pickup & delivery",
            "Eco-friendly products",
            "Fast turnaround"
        ]);
        setTextList(".feature-item p", [
            "We come to you and return your order right to your door.",
            "We use cleaning products that are safer for you and your family.",
            "We stick to timelines so you can save time."
        ]);

        setText(".blog-section .section-header h2", "Blog");
        setText(".blog-section .section-header p", "Useful tips and ideas for caring for your clothes and home textiles");
        if (blogCards.length >= 6) {
            setText(blogCards[0].querySelector("h3"), "How to keep your clothes in great condition longer?");
            setText(blogCards[0].querySelector("p"), "Practical tips for sorting laundry and choosing the right detergents for different fabrics.");
            setHtml(blogCards[0].querySelector(".read-more"), "Read more <i class=\"fas fa-arrow-left\"></i>");
            setText(blogCards[1].querySelector("h3"), "When do you need professional carpet cleaning?");
            setText(blogCards[1].querySelector("p"), "Signs that it is time to clean carpets and rugs, and how to choose the right service.");
            setHtml(blogCards[1].querySelector(".read-more"), "Read more <i class=\"fas fa-arrow-left\"></i>");
            setText(blogCards[2].querySelector("h3"), "Benefits of professional ironing for workwear");
            setText(blogCards[2].querySelector("p"), "Why many people trust a laundry service with their formal clothes and how pressing changes the result.");
            setHtml(blogCards[2].querySelector(".read-more"), "Read more <i class=\"fas fa-arrow-left\"></i>");
            setText(blogCards[3].querySelector("h3"), "Why professional cleaning services improve everyday life");
            setText(blogCards[3].querySelector("p"), "Comfort, quality, hygiene and time savings in one practical article.");
            setHtml(blogCards[3].querySelector(".read-more"), "Read more <i class=\"fas fa-arrow-left\"></i>");
            setText(blogCards[4].querySelector("h3"), "How to clean your car carpet like a pro");
            setText(blogCards[4].querySelector("p"), "Simple steps for preparation, stain treatment, the right cleaners and drying tips.");
            setHtml(blogCards[4].querySelector(".read-more"), "Read more <i class=\"fas fa-arrow-left\"></i>");
            setText(blogCards[5].querySelector("h3"), "How to remove underarm stains and keep clothes fresh");
            setText(blogCards[5].querySelector("p"), "Effective home methods and common mistakes to avoid before professional treatment is needed.");
            setHtml(blogCards[5].querySelector(".read-more"), "Read more <i class=\"fas fa-arrow-left\"></i>");
        }

        setText(".map-section .section-header h2", "Our location");
        setText(".map-section .section-header p", "Visit us in Ajman or contact us to arrange pickup from your location.");
        setAttr(".map-container iframe", "src", "https://www.google.com/maps?q=25.3953186,55.435389&z=17&hl=en&output=embed");
        setAttr(".map-container iframe", "title", "Rapid Wash location on the map");
        setHtml(".map-address-card h3", "<i class=\"fas fa-map-marker-alt\"></i> Address");
        setText(".map-address-card p", "14 Al Aqsa Street, Al Rashidiya 3, Ajman, United Arab Emirates");
        setHtml(".btn-map", "<i class=\"fas fa-external-link-alt\"></i> Open in Google Maps");

        if (footerColumns.length >= 4) {
            setText(footerColumns[0].querySelector("p"), "Your trusted partner for clothing and home textile care. We provide complete cleaning services at competitive prices.");
            setText(footerColumns[1].querySelector("h3"), "Quick Links");
            setTextList(".footer-links a", ["Home", "Services", "About", "Gallery", "Blog", "Pricing", "Location"]);
            setText(footerColumns[2].querySelector("h3"), "Contact Us");
            setHtml(footerColumns[2].querySelector(".whatsapp-footer-btn"), "<i class=\"fab fa-whatsapp\"></i> Message us on WhatsApp");
            setText(footerColumns[3].querySelector("h3"), "Follow Us");
            setText(footerColumns[3].querySelector("p"), "Follow us on social platforms for more offers and care tips");
        }
        setAttr(".footer-facebook", "aria-label", "Facebook");
        setAttr(".footer-google", "aria-label", "Google Maps");
        setHtml(".copyright", "&copy; 2026 Rapid Wash. All Rights Reserved.<br>Site designed by <a href=\"https://moharamradwan.com/\" target=\"_blank\" rel=\"noopener noreferrer\">Moharam Radwan Software</a>");
    }

    function applyGalleryEnglish() {
        var footerColumns = qa(".footer-col");

        document.title = "Rapid Wash Gallery | Laundry and Ironing Service Photos";
        setMeta("meta[name=\"description\"]", "Browse a curated gallery of Rapid Wash laundry and ironing work in Ajman, including photos and videos.");
        setMeta("meta[property=\"og:title\"]", "Rapid Wash Gallery | Laundry and Ironing Service Photos");
        setMeta("meta[property=\"og:description\"]", "A quick photo and video gallery showing the quality and organization behind Rapid Wash in Ajman.");
        setMeta("meta[property=\"og:image:alt\"]", "Photo from the Rapid Wash gallery");
        setMeta("meta[name=\"twitter:title\"]", "Rapid Wash Gallery | Laundry and Ironing Service Photos");
        setMeta("meta[name=\"twitter:description\"]", "A quick photo and video gallery showing the quality and organization behind Rapid Wash in Ajman.");

        setHtml(".nav-links .btn-close-menu", "<i class=\"fas fa-times\"></i> Close");
        setTextList(".nav-links a", ["Home", "Services", "About", "Gallery", "Blog", "Pricing"]);
        setHtml(".btn-header", "<i class=\"fab fa-whatsapp\"></i> WhatsApp");
        setText(".skip-link", "Skip to content");
        setHtml(".gallery-hero .badge", "<i class=\"fas fa-images\"></i> Rapid Wash Gallery");
        setHtml(".gallery-hero h1", "Photos <span>and video</span> from our world");
        setText(".gallery-hero p", "Explore our service quality and day-to-day work through a curated gallery of photos and videos from Rapid Wash.");
        setAttr(".gallery-filter", "aria-label", "Filter gallery");
        setTextList(".gallery-filter button", ["All", "Photos", "Videos"]);
        setText(".gallery-toolbar-copy", "A curated selection from our work and services at Rapid Wash. Open any image in full size or play a video directly from the gallery.");
        setText(".gallery-count-label", "Items shown:");
        setText(".gallery-cta h2", "Ready to send your order?");
        setText(".gallery-cta p", "Contact us on WhatsApp and we will coordinate pickup and delivery as quickly as possible.");
        setHtml(".gallery-cta .btn-header", "<i class=\"fab fa-whatsapp\"></i> Order on WhatsApp");

        setAttr("#lightbox", "aria-label", "View image");
        setAttr(".lightbox-close", "aria-label", "Close");
        setAttr("#videoModal", "aria-label", "View video");
        setAttr(".video-modal-close", "aria-label", "Close");
        setAttr("#videoFrame", "title", "Video");

        if (footerColumns.length >= 3) {
            setText(footerColumns[0].querySelector("p"), "A photo and video gallery from inside Rapid Wash - lasting freshness and polished care.");
            setText(footerColumns[1].querySelector("h3"), "Links");
            setTextList(".footer-col:nth-child(2) a", ["Home", "Services", "Gallery", "Pricing"]);
            setHtml(footerColumns[2].querySelector(".btn-header"), "<i class=\"fab fa-whatsapp\"></i> WhatsApp");
        }
        setHtml(".copyright", "&copy; 2026 Rapid Wash. All Rights Reserved.<br>Site designed by <a href=\"https://moharamradwan.com/\" target=\"_blank\" rel=\"noopener noreferrer\">Moharam Radwan Software</a>");
    }

    function applyBlogPage(config) {
        var sections = qa(".article-section");

        document.title = config.title;
        setHtml(".back", "<i class=\"fas fa-arrow-right\"></i> Back to Blog");
        setHtml(".site-footer", "<a href=\"index.html\">Rapid Wash</a> - Professional laundry service &copy; 2026<br>Site designed by <a href=\"https://moharamradwan.com/\" target=\"_blank\" rel=\"noopener noreferrer\">Moharam Radwan Software</a>");
        setHtml(".article-wrap h1", config.heading);
        setInnerTextList(q(".article-wrap"), ".article-intro", config.intros, "text");

        config.sections.forEach(function(sectionConfig, index) {
            var section = sections[index];
            if (!section) {
                return;
            }
            setHtml(section.querySelector("h2"), sectionConfig.heading);
            if (sectionConfig.paragraphs) {
                setInnerTextList(section, "p", sectionConfig.paragraphs, sectionConfig.paragraphMode || "text");
            }
            if (sectionConfig.items) {
                setInnerTextList(section, "li", sectionConfig.items, sectionConfig.itemsMode || "text");
            }
            if (sectionConfig.tipBox) {
                setText(section.querySelector(".tip-box"), sectionConfig.tipBox);
            }
        });
    }

    function applyBlogKeepClothesEnglish() {
        applyBlogPage({
            title: "How to Keep Your Clothes Looking Great for Longer | Rapid Wash",
            heading: "How to keep your clothes looking great for longer?",
            intros: [
                "Clothes are an investment in your appearance and confidence. Taking care of them for longer saves money and helps you stay polished. In this article, we share practical tips for caring for your clothes."
            ],
            sections: [
                {
                    heading: "<span class=\"icon\" style=\"background:#5dade2;\"><i class=\"fas fa-shirt\"></i></span> First: Wash them the right way",
                    items: [
                        "Read the care label and follow the washing instructions.",
                        "Always separate white clothes from colored ones.",
                        "Use the right water temperature. Cold water helps protect colors.",
                        "Do not use too much detergent so residue does not stay on the fabric.",
                        "Turn clothes inside out before washing to protect colors and prints."
                    ]
                },
                {
                    heading: "<span class=\"icon\" style=\"background:#9b59b6;\"><i class=\"fas fa-wind\"></i></span> Second: Dry with care",
                    items: [
                        "Avoid high-heat drying in the dryer because heat weakens fabrics.",
                        "Air drying is best whenever possible.",
                        "Do not leave clothes in direct sunlight for too long so colors do not fade."
                    ]
                },
                {
                    heading: "<span class=\"icon\" style=\"background:#e74c3c;\"><i class=\"fas fa-vest\"></i></span> Third: Store them properly",
                    items: [
                        "Use the right hangers for shirts and coats.",
                        "Fold wool garments instead of hanging them so they do not stretch.",
                        "Store clothes in a dry, well-ventilated place.",
                        "Use fabric garment bags instead of plastic for premium pieces."
                    ]
                },
                {
                    heading: "<span class=\"icon\" style=\"background:#27ae60;\"><i class=\"fas fa-droplet\"></i></span> Fourth: Treat stains quickly",
                    items: [
                        "Deal with stains immediately before they dry and set.",
                        "Do not scrub a stain harshly so the fabric is not damaged.",
                        "Use specialized cleaners depending on the fabric type."
                    ]
                },
                {
                    heading: "<span class=\"icon\" style=\"background:#c0392b;\"><i class=\"fas fa-toolbox\"></i></span> Fifth: Keep up with routine maintenance",
                    items: [
                        "Fix loose or missing buttons right away.",
                        "Do not ignore small loose threads.",
                        "Use a lint remover for cotton and wool garments."
                    ]
                },
                {
                    heading: "<span class=\"icon\"><i class=\"fas fa-star\"></i></span> Conclusion",
                    paragraphs: [
                        "Clothing care is not complicated. It simply needs small, consistent attention. When you care for your clothes, they stay in good condition for years and you continue to look neat without constantly buying replacements."
                    ]
                }
            ]
        });
    }

    function applyBlogCarpetWashingEnglish() {
        applyBlogPage({
            title: "When Do You Need Professional Carpet Cleaning? | Rapid Wash",
            heading: "<i class=\"fas fa-leaf title-icon\"></i> When do you need professional carpet cleaning?",
            intros: [
                "Professional carpet cleaning is not a luxury. In many cases, it is essential for hygiene, health and maintaining carpet quality."
            ],
            sections: [
                {
                    heading: "<span class=\"num\">1</span> When tough stains appear",
                    paragraphs: [
                        "If you have tried removing a stain several times and it still remains, such as coffee, juice, ink or grease, home treatment may actually set the stain instead of removing it."
                    ]
                },
                {
                    heading: "<span class=\"num\">2</span> When unpleasant odors appear",
                    paragraphs: [
                        "If you notice musty smells, pet odors or smoke, dirt has likely settled deep inside the fibers and surface cleaning will not be enough."
                    ]
                },
                {
                    heading: "<span class=\"num\">3</span> In cases of allergies or asthma",
                    paragraphs: [
                        "Carpets trap dust, mites and microbes. If someone at home has allergies or breathing issues, professional cleaning every 6 to 12 months is a smart choice."
                    ]
                },
                {
                    heading: "<span class=\"num\">4</span> After water leakage or flooding",
                    paragraphs: [
                        "Moisture can cause hidden mold inside the carpet. Deep washing and professional drying help prevent floor damage and lingering odors."
                    ]
                },
                {
                    heading: "<span class=\"num\">5</span> When the carpet looks dull or faded",
                    paragraphs: [
                        "If your carpet still looks tired even after normal cleaning, deep dust buildup is usually the reason."
                    ]
                },
                {
                    heading: "<span class=\"num\">6</span> In high-traffic homes",
                    paragraphs: [
                        "Homes with children, pets or heavy daily traffic usually benefit from professional carpet cleaning twice a year."
                    ]
                },
                {
                    heading: "<span class=\"icon\" style=\"background:#27ae60;\"><i class=\"fas fa-clipboard-check\"></i></span> General recommendation",
                    items: [
                        "Standard home: once every 12 months",
                        "With children or pets: every 6 months",
                        "Commercial spaces: every 3 to 6 months"
                    ]
                },
                {
                    heading: "<span class=\"icon\"><i class=\"fas fa-star\"></i></span> Conclusion",
                    paragraphs: [
                        "If your vacuum is no longer enough, or you notice stains and odors that do not go away, that is the right time to request professional carpet cleaning."
                    ]
                }
            ]
        });
    }

    function applyBlogProfessionalIroningEnglish() {
        applyBlogPage({
            title: "Benefits of Professional Ironing for Workwear | Rapid Wash",
            heading: "Benefits of professional ironing for workwear",
            intros: [
                "Workwear reflects your professional image in front of clients and colleagues. A polished appearance is not a luxury, it is part of the first impression, and that is where professional ironing matters."
            ],
            sections: [
                {
                    heading: "<span class=\"num\">1</span> A professional look that builds confidence",
                    paragraphs: [
                        "<strong>Carefully pressed clothes:</strong>"
                    ],
                    paragraphMode: "html",
                    items: [
                        "Create an impression of care and organization",
                        "Reflect seriousness and professionalism",
                        "Build client confidence from the first moment"
                    ]
                },
                {
                    heading: "<span class=\"num\">2</span> Protecting fabric quality",
                    paragraphs: [
                        "Home ironing sometimes uses the wrong heat and can cause light scorching, unwanted shine or fiber damage. Professional ironing uses the right temperature for each fabric, whether cotton, wool, polyester or formal suits."
                    ]
                },
                {
                    heading: "<span class=\"num\">3</span> Extending the life of garments",
                    paragraphs: [
                        "<strong>Proper ironing:</strong>"
                    ],
                    paragraphMode: "html",
                    items: [
                        "Keeps the shape of shirts and suits",
                        "Sets folds and creases in a balanced way",
                        "Reduces the need to replace clothes too often"
                    ]
                },
                {
                    heading: "<span class=\"num\">4</span> Saving time and effort",
                    paragraphs: [
                        "Business owners and employees often do not have time for daily ironing. A professional service saves morning prep time and takes the hassle out of handling delicate items."
                    ]
                },
                {
                    heading: "<span class=\"num\">5</span> Special care for suits and formal shirts",
                    paragraphs: [
                        "<strong>Suits require:</strong>",
                        "And that is difficult to achieve consistently at home."
                    ],
                    paragraphMode: "html",
                    items: [
                        "Professional steam",
                        "Accurate trouser crease setting",
                        "Protection for buttons and delicate fabrics"
                    ]
                },
                {
                    heading: "<span class=\"num\">6</span> Light sanitizing and odor refresh",
                    paragraphs: [
                        "<strong>Professional steam helps with:</strong>"
                    ],
                    paragraphMode: "html",
                    items: [
                        "Reducing bacteria",
                        "Removing light odors",
                        "Refreshing fabric without repeated washing"
                    ]
                },
                {
                    heading: "<span class=\"icon\"><i class=\"fas fa-star\"></i></span> Conclusion",
                    paragraphs: [
                        "Professional ironing is not just about removing wrinkles. It is an investment in your professional identity and daily polish, and every detail makes a difference."
                    ]
                }
            ]
        });
    }

    function applyBlogProfessionalCleaningEnglish() {
        applyBlogPage({
            title: "Why Professional Cleaning Services Improve Quality of Life | Rapid Wash",
            heading: "Why professional cleaning services improve quality of life",
            intros: [
                "In a fast-paced world full of daily commitments, professional cleaning services have become a real necessity rather than a luxury. Whether it is clothing, carpets, furnishings or full home cleaning, relying on specialists saves time and effort while delivering better results than traditional methods."
            ],
            sections: [
                {
                    heading: "<span class=\"icon\" style=\"background:#5dade2;\"><i class=\"fas fa-sparkles\"></i></span> First: Why professional cleaning is better than home cleaning",
                    paragraphs: [
                        "Home cleaning is often surface-level and depends on simple tools and general cleaners. Professional services use:",
                        "That difference appears clearly in the final result."
                    ],
                    items: [
                        "Specialized high-performance equipment",
                        "Safe products suited to each fabric type",
                        "Modern techniques for deep stain removal",
                        "Steam and sanitizing that reduce bacteria and odors"
                    ]
                },
                {
                    heading: "<span class=\"icon\" style=\"background:#9b59b6;\"><i class=\"fas fa-shirt\"></i></span> Second: Caring for clothes and extending their life",
                    paragraphs: [
                        "Clothes are not just fabric. They are part of your appearance and self-confidence. Professional washing and ironing help with:",
                        "Proper care is a long-term investment."
                    ],
                    items: [
                        "Maintaining fabric colors",
                        "Preventing fiber damage",
                        "Keeping shirts and trousers neatly shaped",
                        "Reducing the need to buy replacements frequently"
                    ]
                },
                {
                    heading: "<span class=\"icon\" style=\"background:#27ae60;\"><i class=\"fas fa-couch\"></i></span> Third: Deep cleaning for carpets and home textiles",
                    paragraphs: [
                        "Carpets absorb dust, odors and microbes over time. Professional cleaning removes:",
                        "This noticeably improves indoor air quality."
                    ],
                    items: [
                        "Deep trapped dust",
                        "Stubborn stains",
                        "Odors from moisture or pets",
                        "Allergy triggers"
                    ]
                },
                {
                    heading: "<span class=\"icon\" style=\"background:#e74c3c;\"><i class=\"fas fa-clock\"></i></span> Fourth: Saving time and adding comfort",
                    paragraphs: [
                        "One of the biggest advantages of professional cleaning is time savings. Instead of spending hours washing, ironing and cleaning, you can use that time for work, family or rest.",
                        "Pickup and delivery also add a higher level of comfort and flexibility."
                    ]
                },
                {
                    heading: "<span class=\"icon\" style=\"background:#16a085;\"><i class=\"fas fa-heart-pulse\"></i></span> Fifth: The health benefit",
                    paragraphs: [
                        "Cleanliness is not only about appearance, it is also about health. Professional cleaning helps reduce:",
                        "This matters even more in homes with children or older adults."
                    ],
                    items: [
                        "Bacteria",
                        "Mold",
                        "Allergy triggers",
                        "Unwanted odors"
                    ]
                },
                {
                    heading: "<span class=\"icon\"><i class=\"fas fa-star\"></i></span> Conclusion",
                    paragraphs: [
                        "Using professional cleaning services is a smart decision that combines comfort, quality and hygiene. Whether you need garment care or deeper household cleaning, a professional service gives lasting results and peace of mind."
                    ]
                }
            ]
        });
    }

    function applyBlogCarCarpetEnglish() {
        applyBlogPage({
            title: "How to Clean Your Car Carpet Like a Pro | Rapid Wash",
            heading: "How to clean your car carpet like a pro",
            intros: [
                "Cleaning your car carpet well is not difficult when you follow the right steps and use the proper tools. Car carpets face daily dust, food residue, spills and odors, so they need regular care to keep the interior looking and smelling fresh."
            ],
            sections: [
                {
                    heading: "<span class=\"icon\" style=\"background:#5dade2;\"><i class=\"fas fa-toolbox\"></i></span> First: Prepare before cleaning",
                    paragraphs: [
                        "If possible, remove the carpet from the car. Shake it well to remove loose dust, then vacuum the entire surface with extra attention to corners and edges where dirt gathers.",
                        "If the carpet is fixed in place, use a narrow nozzle to reach tight spaces between the seats."
                    ]
                },
                {
                    heading: "<span class=\"icon\" style=\"background:#9b59b6;\"><i class=\"fas fa-droplet\"></i></span> Second: Treat tough stains",
                    paragraphs: [
                        "Each stain type needs its own method:",
                        "Avoid scrubbing too hard so you do not damage the fibers."
                    ],
                    items: [
                        "<strong>Coffee and drink stains:</strong> Use lukewarm water with a little cleaner and rub gently.",
                        "<strong>Mud stains:</strong> Let them dry first, then vacuum before cleaning with water.",
                        "<strong>Grease stains:</strong> Sprinkle a little baking soda and leave it for a few minutes before cleaning."
                    ],
                    itemsMode: "html"
                },
                {
                    heading: "<span class=\"icon\" style=\"background:#27ae60;\"><i class=\"fas fa-spray-can\"></i></span> Third: Use a cleaner made for car carpets",
                    paragraphs: [
                        "It is best to use products made for car carpets because they remove odors and stains without harming the material. Spray evenly and use a soft brush with circular motions to work the cleaner into the fibers."
                    ]
                },
                {
                    heading: "<span class=\"icon\" style=\"background:#e74c3c;\"><i class=\"fas fa-sun\"></i></span> Fourth: Rinse and dry properly",
                    paragraphs: [
                        "Do not use too much water so the carpet does not stay overly damp. After cleaning, press it with a dry cloth to absorb excess moisture.",
                        "Let the carpet dry fully in a well-ventilated area or under indirect sunlight. Proper drying prevents bad odors and mold."
                    ]
                },
                {
                    heading: "<span class=\"icon\" style=\"background:#16a085;\"><i class=\"fas fa-shield-halved\"></i></span> Fifth: Keep it clean for longer",
                    items: [
                        "Vacuum the carpet once a week.",
                        "Try to avoid eating inside the car.",
                        "Use protective layers or extra mats to preserve the original carpet."
                    ]
                },
                {
                    heading: "<span class=\"icon\"><i class=\"fas fa-star\"></i></span> When do you need professional cleaning?",
                    paragraphs: [
                        "If odors are deep or stains are stubborn, professional steam cleaning is the best solution. Deep cleaning every 6 to 12 months helps preserve cleanliness and value."
                    ]
                },
                {
                    heading: "<span class=\"icon\"><i class=\"fas fa-check-circle\"></i></span> Conclusion",
                    paragraphs: [
                        "Cleaning car carpets well depends on consistency and the right method. A little regular care keeps your car fresh and clean all the time."
                    ]
                }
            ]
        });
    }

    function applyBlogUnderarmStainsEnglish() {
        applyBlogPage({
            title: "How to Remove Underarm Stains and Keep Clothes Fresh | Rapid Wash",
            heading: "How to remove underarm stains and keep clothes fresh",
            intros: [
                "Underarm stains are one of the most common issues that affect the look of clothes, especially white shirts and workwear. They usually happen when sweat reacts with deodorant, causing yellowing or dark marks that can become difficult to remove if not treated correctly.",
                "In this guide, we share effective and proven ways to remove underarm stains and bring freshness back to your clothes."
            ],
            sections: [
                {
                    heading: "<span class=\"icon\" style=\"background:#5dade2;\"><i class=\"fas fa-bolt\"></i></span> First: Fast action prevents the stain from setting",
                    paragraphs: [
                        "The earlier you treat the stain, the easier it is to remove. Do not place the shirt directly in the washer without pre-treatment, because heat may lock the stain in."
                    ]
                },
                {
                    heading: "<span class=\"icon\" style=\"background:#9b59b6;\"><i class=\"fas fa-vial\"></i></span> Second: Use baking soda",
                    paragraphs: [
                        "Baking soda is one of the best natural solutions:",
                        "This method is very effective for removing yellowing."
                    ],
                    items: [
                        "Mix 4 tablespoons of baking soda with a little water until it forms a paste.",
                        "Apply the paste to the stained area.",
                        "Leave it for 30 to 60 minutes.",
                        "Wash the shirt as usual."
                    ]
                },
                {
                    heading: "<span class=\"icon\" style=\"background:#27ae60;\"><i class=\"fas fa-droplet\"></i></span> Third: White vinegar for brightening and odor removal",
                    paragraphs: [
                        "White vinegar helps break down deodorant buildup:",
                        "It also removes trapped odors and refreshes the fabric."
                    ],
                    items: [
                        "Soak the stained area in a vinegar-and-water mix for 20 minutes.",
                        "Rub gently before washing."
                    ]
                },
                {
                    heading: "<span class=\"icon\" style=\"background:#e67e22;\"><i class=\"fas fa-sun\"></i></span> Fourth: Lemon juice for white cotton fabrics",
                    paragraphs: [
                        "Natural lemon juice works as a mild brightener:"
                    ],
                    items: [
                        "Apply lemon juice to the stain.",
                        "Leave it under sunlight for a short time.",
                        "Wash the item afterward."
                    ],
                    tipBox: "This method is best for white clothing only."
                },
                {
                    heading: "<span class=\"icon\" style=\"background:#e74c3c;\"><i class=\"fas fa-times-circle\"></i></span> Fifth: Avoid common mistakes",
                    items: [
                        "Do not use hot water before removing the stain.",
                        "Do not overuse deodorant.",
                        "Let deodorant dry before putting the shirt on."
                    ]
                },
                {
                    heading: "<span class=\"icon\" style=\"background:#16a085;\"><i class=\"fas fa-shield-halved\"></i></span> Tips to prevent underarm stains",
                    items: [
                        "Choose an aluminum-free deodorant when possible.",
                        "Wear cotton undershirts to absorb sweat.",
                        "Wash clothes right after use."
                    ]
                },
                {
                    heading: "<span class=\"icon\"><i class=\"fas fa-star\"></i></span> When do you need professional cleaning?",
                    paragraphs: [
                        "If stains are old, repeated or do not respond to home treatment, professional cleaning with specialized methods is the best way to restore the fabric without damage."
                    ]
                },
                {
                    heading: "<span class=\"icon\"><i class=\"fas fa-check-circle\"></i></span> Conclusion",
                    paragraphs: [
                        "Underarm stains do not have to be permanent. They simply need the right response and timely care. With the right methods, you can keep your clothes clean and fresh for longer."
                    ]
                }
            ]
        });
    }

    var PAGE_HANDLERS = {
        "index": applyIndexEnglish,
        "gallery": applyGalleryEnglish,
        "blog-keep-clothes": applyBlogKeepClothesEnglish,
        "blog-carpet-washing": applyBlogCarpetWashingEnglish,
        "blog-professional-ironing": applyBlogProfessionalIroningEnglish,
        "blog-professional-cleaning": applyBlogProfessionalCleaningEnglish,
        "blog-car-carpet": applyBlogCarCarpetEnglish,
        "blog-underarm-stains": applyBlogUnderarmStainsEnglish
    };

    function init() {
        var lang = getLanguage();
        var page = document.body ? document.body.getAttribute("data-page") : "";

        applyDirection(lang);
        buildSwitchers();

        if (lang !== "en") {
            return;
        }

        applyEnglishGlobal();

        if (page && PAGE_HANDLERS[page]) {
            PAGE_HANDLERS[page]();
        }
    }

    window.RapidWashI18n = {
        getLanguage: getLanguage,
        getMenuLabel: getMenuLabel,
        setLanguage: setLanguage
    };

    document.addEventListener("DOMContentLoaded", init);
})(window, document);
