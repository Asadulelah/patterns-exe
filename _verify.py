from playwright.sync_api import sync_playwright
import time

url = 'file:///C:/Users/FoxOS_User/Developer/patterns-exe/index.html'
out = r'C:/Users/FoxOS_User/Developer/patterns-exe/'

def run_quiz(pg, answers, shot_prefix, shoot=True):
    pg.goto(url)
    pg.wait_for_selector('#beginBtn.show', timeout=40000)
    time.sleep(0.6)
    if shoot: pg.screenshot(path=out + shot_prefix + '-1-boot.png')
    pg.click('#beginBtn')
    pg.wait_for_selector('#intake.on', timeout=5000)
    pg.fill('#nameIn', 'ASAD')
    pg.keyboard.press('Enter')
    pg.wait_for_selector('#exam.on', timeout=5000)
    for i, a in enumerate(answers):
        pg.wait_for_selector('.opts.show .opt', timeout=30000)
        if shoot and i == 3:
            time.sleep(1.0)  # let the vignette animate
            pg.screenshot(path=out + shot_prefix + '-2-question.png')
        pg.click(f'.opts .opt[data-i="{a-1}"]')
        time.sleep(0.85)
    pg.wait_for_selector('#analysis.on', timeout=10000)
    if shoot:
        time.sleep(3.5)
        pg.screenshot(path=out + shot_prefix + '-3-analysis.png')
    pg.wait_for_selector('#verdict.on', timeout=30000)
    time.sleep(2.6)  # numeral assembly + stamp + cells
    if shoot: pg.screenshot(path=out + shot_prefix + '-4-verdict.png')
    return pg.inner_text('#vName'), pg.inner_text('#vSec')

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width': 1440, 'height': 920}, device_scale_factor=1.5)
    errs = []
    pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
    pg.on('pageerror', lambda e: errs.append(str(e)))

    n1, s1 = run_quiz(pg, [2, 4, 4, 1, 2, 1, 3, 2], 'shot-d1')          # planner profile
    print('RUN1:', n1.replace('—', '-'))
    n2, s2 = run_quiz(pg, [4, 1, 1, 2, 3, 3, 2, 4], 'shot-d2', False)   # identity profile
    print('RUN2:', n2)

    # verdict card download
    with pg.expect_download() as dl:
        pg.click('#cardBtn')
    dl.value.save_as(out + 'verdict-card-sample.png')
    print('card ok:', dl.value.suggested_filename)

    # deep link shared mode
    pg.goto(url + '#p2')
    pg.wait_for_selector('#verdict.on', timeout=15000)
    time.sleep(2.2)
    pg.screenshot(path=out + 'shot-d3-shared.png')
    print('SHARED:', pg.inner_text('#vName'), '| note visible:', pg.is_visible('#sharedNote'))

    print('desktop errors:', errs if errs else 'none')

    # mobile pass
    m = b.new_page(viewport={'width': 390, 'height': 844}, device_scale_factor=2, is_mobile=True)
    merr = []
    m.on('pageerror', lambda e: merr.append(str(e)))
    nm, sm = run_quiz(m, [1, 2, 2, 3, 1, 2, 1, 1], 'shot-m', True)
    print('MOBILE:', nm)
    print('mobile errors:', merr if merr else 'none')
    b.close()
print('OK')
