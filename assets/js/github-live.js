/**
 * github-live.js — realtime GitHub data for the Hemal Das portfolio.
 * Fetches public profile + repositories from the GitHub API, caches the
 * result for 30 minutes and renders live stats, project cards and filters.
 * Author: Hemal Das · Last updated: October 2026
 */
(function () {
    'use strict';

    /* CONFIG — edit these lines to change what the site shows */
    var GITHUB_USER = 'HemalDas666';
    var EXCLUDE_REPOS = ['Hphisher', 'FreeFirePhising-Access', 'Rule-breaker'];
    var SHOW_FORKS = false;
    var CACHE_KEY = 'hd_github_cache_v1';
    var CACHE_TTL = 30 * 60 * 1000;

    var API_BASE = 'https://api.github.com/users/' + GITHUB_USER;

    /* Real repository data used when the API is unreachable (offline/rate-limit) */
    var FALLBACK = {
        profile: { public_repos: 22, followers: 0 },
        repos: [
            { name: 'Personal-Hosting-Panal', description: 'Personal hosting panel built with TypeScript', language: 'TypeScript', stars: 0, forks: 1, homepage: 'https://personal-hosting-panal.vercel.app', pushed_at: '2026-08-09T05:57:47Z', html_url: 'https://github.com/HemalDas666/Personal-Hosting-Panal' },
            { name: 'Daytona', description: 'Shell setup toolkit', language: 'Shell', stars: 0, forks: 0, homepage: '', pushed_at: '2026-07-27T09:45:51Z', html_url: 'https://github.com/HemalDas666/Daytona' },
            { name: 'Setup-and-wings', description: 'Server setup scripts', language: 'Shell', stars: 0, forks: 0, homepage: '', pushed_at: '2026-07-24T02:53:36Z', html_url: 'https://github.com/HemalDas666/Setup-and-wings' },
            { name: 'Hemals-Panal', description: 'Hosting control panel (PHP)', language: 'PHP', stars: 0, forks: 0, homepage: '', pushed_at: '2026-07-24T02:23:01Z', html_url: 'https://github.com/HemalDas666/Hemals-Panal' },
            { name: 'Hemals-Hosting-Panal', description: 'Hosting panel with TypeScript frontend', language: 'TypeScript', stars: 0, forks: 1, homepage: '', pushed_at: '2026-07-23T14:59:01Z', html_url: 'https://github.com/HemalDas666/Hemals-Hosting-Panal' },
            { name: 'HeranmoyDasPortfolio', description: 'Portfolio website', language: 'HTML', stars: 0, forks: 0, homepage: '', pushed_at: '2026-07-04T04:19:16Z', html_url: 'https://github.com/HemalDas666/HeranmoyDasPortfolio' },
            { name: 'Hemals-AI-MINE-BOT', description: 'AI powered Minecraft bot', language: 'JavaScript', stars: 0, forks: 0, homepage: '', pushed_at: '2026-07-01T03:01:54Z', html_url: 'https://github.com/HemalDas666/Hemals-AI-MINE-BOT' },
            { name: 'MinecraftAFKBOT', description: 'AFK bot for Minecraft servers', language: 'JavaScript', stars: 0, forks: 0, homepage: '', pushed_at: '2026-06-19T03:27:46Z', html_url: 'https://github.com/HemalDas666/MinecraftAFKBOT' },
            { name: 'LAVIX_ASSISTANT', description: 'Virtual assistant project', language: '', stars: 0, forks: 0, homepage: '', pushed_at: '2026-06-10T11:08:33Z', html_url: 'https://github.com/HemalDas666/LAVIX_ASSISTANT' },
            { name: 'The-Knights-Of-BD', description: 'Community website for The Knights of BD', language: 'CSS', stars: 0, forks: 0, homepage: '', pushed_at: '2026-06-03T12:28:24Z', html_url: 'https://github.com/HemalDas666/The-Knights-Of-BD' },
            { name: 'Hemals-ChatApp', description: 'Realtime chat application', language: 'JavaScript', stars: 0, forks: 0, homepage: '', pushed_at: '2026-05-25T02:57:03Z', html_url: 'https://github.com/HemalDas666/Hemals-ChatApp' },
            { name: 'My-Portfolio', description: 'My personal portfolio website', language: 'CSS', stars: 0, forks: 0, homepage: '', pushed_at: '2026-02-20T16:38:14Z', html_url: 'https://github.com/HemalDas666/My-Portfolio' },
            { name: 'Hemals-Afk-Bot-For-Minecraft', description: 'AFK bot for Aternos and other hosts', language: 'JavaScript', stars: 0, forks: 0, homepage: '', pushed_at: '2026-02-20T08:55:15Z', html_url: 'https://github.com/HemalDas666/Hemals-Afk-Bot-For-Minecraft' },
            { name: 'darkknight-smp', description: 'Website for the DarkKnight SMP server', language: 'CSS', stars: 0, forks: 0, homepage: '', pushed_at: '2026-02-20T04:49:21Z', html_url: 'https://github.com/HemalDas666/darkknight-smp' },
            { name: 'Friday-Vartual-assistent', description: 'AI assistant built with Python', language: 'Python', stars: 0, forks: 0, homepage: '', pushed_at: '2025-09-15T11:38:58Z', html_url: 'https://github.com/HemalDas666/Friday-Vartual-assistent' },
            { name: 'IMEI-TRACKER', description: 'IMEI tracker tool built with Python (v1.5)', language: 'Python', stars: 0, forks: 1, homepage: '', pushed_at: '2025-09-11T14:13:18Z', html_url: 'https://github.com/HemalDas666/IMEI-TRACKER' }
        ]
    };

    var LANGUAGE_COLORS = {
        JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
        HTML: '#e34c26', CSS: '#563d7c', PHP: '#4F5D95', Shell: '#89e051',
        Java: '#b07219', C: '#555555', 'C++': '#f34b7d'
    };

    function escapeHtml(value) {
        return String(value == null ? '' : value)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    }

    function timeAgo(isoDate) {
        var seconds = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000);
        if (seconds < 0) return 'just now';
        var units = [[31536000, 'year'], [2592000, 'month'], [604800, 'week'], [86400, 'day'], [3600, 'hour'], [60, 'minute']];
        for (var i = 0; i < units.length; i++) {
            var value = Math.floor(seconds / units[i][0]);
            if (value >= 1) return value + ' ' + units[i][1] + (value > 1 ? 's' : '') + ' ago';
        }
        return 'just now';
    }

    function normalizeRepos(rawRepos) {
        return rawRepos
            .filter(function (repo) {
                if (EXCLUDE_REPOS.indexOf(repo.name) !== -1) return false;
                if (!SHOW_FORKS && repo.fork) return false;
                return true;
            })
            .map(function (repo) {
                return {
                    name: repo.name,
                    description: repo.description || 'No description provided yet.',
                    language: repo.language || '',
                    stars: repo.stargazers_count || 0,
                    forks: repo.forks_count || 0,
                    homepage: repo.homepage || '',
                    pushed_at: repo.pushed_at || repo.updated_at,
                    html_url: repo.html_url,
                    topics: (repo.topics || []).slice(0, 3)
                };
            });
    }

    function categoriesFor(repo) {
        var categories = [];
        var lang = repo.language;
        var text = (repo.name + ' ' + repo.description).toLowerCase();
        if (lang === 'Python') categories.push('python');
        if (lang === 'JavaScript' || lang === 'TypeScript') categories.push('javascript');
        if (lang === 'HTML' || lang === 'CSS' || lang === 'PHP') categories.push('web');
        if (['portfolio', 'website', 'web', 'smp'].some(function (key) { return text.indexOf(key) !== -1; })) categories.push('web');
        if (['chatapp', 'hosting', 'panal', 'panel'].some(function (key) { return text.indexOf(key) !== -1; })) categories.push('fullstack');
        if (!categories.length) categories.push('web');
        return categories.filter(function (value, index, list) { return list.indexOf(value) === index; });
    }

    function countUp(element, target, suffix) {
        if (!element) return;
        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) { element.textContent = target + (suffix || ''); return; }
        var start = performance.now();
        var duration = 900;
        function frame(now) {
            var progress = Math.min((now - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            element.textContent = Math.round(target * eased) + (suffix || '');
            if (progress < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }

    function renderStats(data, repos) {
        var stars = repos.reduce(function (sum, repo) { return sum + repo.stars; }, 0);
        var forks = repos.reduce(function (sum, repo) { return sum + repo.forks; }, 0);
        var languages = {};
        repos.forEach(function (repo) { if (repo.language) languages[repo.language] = true; });

        countUp(document.getElementById('repos-count'), data.profile.public_repos, '+');
        countUp(document.getElementById('followers-count'), data.profile.followers);
        countUp(document.getElementById('languages-count'), Object.keys(languages).length);
        countUp(document.getElementById('years-count'), Math.max(1, new Date().getFullYear() - 2023));
        countUp(document.getElementById('stars-count'), stars);
        countUp(document.getElementById('forks-count'), forks);

        var aboutRepos = document.getElementById('about-repos-count');
        if (aboutRepos) aboutRepos.textContent = data.profile.public_repos;

        var tickerRepos = document.getElementById('liveRepos');
        if (tickerRepos) tickerRepos.textContent = data.profile.public_repos;
    }

    function cardHtml(repo) {
        var categories = categoriesFor(repo).join(' ');
        var color = LANGUAGE_COLORS[repo.language] || '#8b949e';
        var image = 'https://opengraph.githubassets.com/1/' + GITHUB_USER + '/' + encodeURIComponent(repo.name);
        var safeName = escapeHtml(repo.name);

        var techSpans = '<span><span class="language-dot" style="background:' + color + '"></span> ' + escapeHtml(repo.language || 'Code') + '</span>';
        repo.topics.forEach(function (topic) { techSpans += '<span>' + escapeHtml(topic) + '</span>'; });

        var demoButton = repo.homepage
            ? '<a href="' + escapeHtml(repo.homepage) + '" target="_blank" rel="noopener" class="btn small primary">Live Demo</a>'
            : '';
        var demoLink = repo.homepage
            ? '<a href="' + escapeHtml(repo.homepage) + '" target="_blank" rel="noopener" class="project-link" aria-label="Live demo of ' + safeName + '"><i class="fas fa-external-link-alt"></i></a>'
            : '';

        return '' +
            '<div class="project-card" data-category="' + categories + '">' +
                '<div class="project-image">' +
                    '<img loading="lazy" src="' + image + '" alt="' + safeName + ' project by Hemal Das" data-repo="' + safeName + '">' +
                    '<div class="project-overlay">' +
                        '<div class="project-links">' +
                            '<a href="' + escapeHtml(repo.html_url) + '" target="_blank" rel="noopener" class="project-link" aria-label="GitHub repository ' + safeName + '"><i class="fab fa-github"></i></a>' +
                            demoLink +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="project-info">' +
                    '<h3>' + safeName + '</h3>' +
                    '<p>' + escapeHtml(repo.description) + '</p>' +
                    '<div class="project-tech">' + techSpans + '</div>' +
                    '<div class="project-meta">' +
                        '<span><i class="far fa-star"></i> ' + repo.stars + ' star' + (repo.stars === 1 ? '' : 's') + '</span>' +
                        '<span><i class="fas fa-code-branch"></i> ' + repo.forks + ' fork' + (repo.forks === 1 ? '' : 's') + '</span>' +
                        '<span><i class="far fa-clock"></i> Updated ' + timeAgo(repo.pushed_at) + '</span>' +
                    '</div>' +
                    '<div class="project-actions">' +
                        '<a href="' + escapeHtml(repo.html_url) + '" target="_blank" rel="noopener" class="btn small primary">GitHub</a>' +
                        demoButton +
                    '</div>' +
                '</div>' +
            '</div>';
    }

    function wireImageFallbacks(container) {
        container.querySelectorAll('img[data-repo]').forEach(function (img) {
            img.addEventListener('error', function () {
                var fallback = document.createElement('div');
                fallback.className = 'repo-image-fallback';
                fallback.innerHTML = '<i class="fab fa-github"></i><span>' + escapeHtml(img.getAttribute('data-repo')) + '</span>';
                if (img.parentNode) img.parentNode.replaceChild(fallback, img);
            });
        });
    }

    function renderProjects(repos) {
        var grid = document.getElementById('projectsGrid');
        if (!grid) return;
        grid.innerHTML = repos.map(cardHtml).join('');
        wireImageFallbacks(grid);
        applyActiveFilter();
    }

    function applyActiveFilter() {
        var active = document.querySelector('.filter-btn.active');
        var filter = active ? active.getAttribute('data-filter') : 'all';
        document.querySelectorAll('.project-card').forEach(function (card) {
            var categories = card.getAttribute('data-category') || '';
            var visible = filter === 'all' || categories.split(' ').indexOf(filter) !== -1;
            card.classList.toggle('hide', !visible);
        });
    }

    function wireFilters() {
        document.querySelectorAll('.filter-btn').forEach(function (button) {
            button.addEventListener('click', function () {
                document.querySelectorAll('.filter-btn').forEach(function (btn) { btn.classList.remove('active'); });
                button.classList.add('active');
                applyActiveFilter();
            });
        });
    }

    function readCache() {
        try {
            var raw = localStorage.getItem(CACHE_KEY);
            if (!raw) return null;
            var cached = JSON.parse(raw);
            if (Date.now() - cached.savedAt > CACHE_TTL) return null;
            return cached;
        } catch (error) {
            return null;
        }
    }

    function writeCache(data) {
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({ savedAt: Date.now(), data: data }));
        } catch (error) { /* storage unavailable — safe to ignore */ }
    }

    function renderAll(data, fromCache) {
        var repos = normalizeRepos(data.repos);
        renderStats(data, repos);
        renderProjects(repos);
        if (!fromCache && window.console) console.info('[github-live] rendered ' + repos.length + ' repositories from GitHub API');
    }

    function hasTargets() {
        return !!(
            document.getElementById('projectsGrid') ||
            document.getElementById('repos-count') ||
            document.getElementById('liveRepos') ||
            document.getElementById('about-repos-count')
        );
    }

    function init() {
        wireFilters();
        if (!hasTargets()) return;
        var cached = readCache();
        if (cached) renderAll(cached.data, true);

        fetch(API_BASE, { headers: { Accept: 'application/vnd.github+json' } })
            .then(function (response) {
                if (!response.ok) throw new Error('GitHub API ' + response.status);
                return response.json();
            })
            .then(function (profile) {
                return fetch(API_BASE + '/repos?per_page=100&sort=pushed', { headers: { Accept: 'application/vnd.github+json' } })
                    .then(function (response) {
                        if (!response.ok) throw new Error('GitHub API ' + response.status);
                        return response.json();
                    })
                    .then(function (repos) {
                        var data = {
                            profile: { public_repos: profile.public_repos, followers: profile.followers },
                            repos: repos
                        };
                        writeCache(data);
                        renderAll(data, false);
                    });
            })
            .catch(function (error) {
                if (cached) return;
                renderAll(FALLBACK, true);
                if (window.console) console.warn('[github-live] offline fallback used:', error.message);
            });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
}());
