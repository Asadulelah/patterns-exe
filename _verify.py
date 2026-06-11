from playwright.sync_api import sync_playwright
import time

url = 'file:///C:/Users/FoxOS_User/Developer/patterns-exe/index.html'
out = r'C:/Users/FoxOS_User/Developer/patterns-exe/'

def run_quiz(pg, intake, exam_pick, shot_prefix, shoot=True):
    """intake: 3 answers (1-4). exam_pick: index to click for all 8 exam questions."""
    pg.goto(url)
    pg.wait_for_selector('#beginBtn.show', timeout=40000)
    time.sleep(0.5)
    if shoot: pg.screenshot(path=out + shot_prefix + '-1-boot.png')
    pg.click('#beginBtn')
    pg.wait_for_selector('#intake.on', timeout=5000)
    pg.fill('#nameIn', 'ASAD')
    pg.keyboard.press('Enter')
    pg.wait_for_selector('#exam.on', timeout=5000)
    for i, a in enumerate(intake):
        pg.wait_for_selector('.opts.show .opt', timeout=30000)
        pg.click(f'.opts .opt[data-i="{a-1}"]')
        time.sleep(0.85)
    for i in range(8):
        pg.wait_for_selector('.opts.show .opt', timeout=30000)
        if shoot and i == 2:
            time.sleep(1.0)
            pg.screenshot(path=out + shot_prefix + '-2-question.png')
        pg.click(f'.opts .opt[data-i="{exam_pick-1}"]')
        time.sleep(0.85)
    pg.wait_for_selector('#analysis.on', timeout=15000)
    pg.wait_for_selector('#verdict.on', timeout=40000)
    time.sleep(2.6)
    if shoot: pg.screenshot(path=out + shot_prefix + '-4-verdict.png')
    return pg.inner_text('#vName'), pg.inner_text('#vDare')

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width': 1440, 'height': 920}, device_scale_factor=1.5)
    errs = []
    pg.on('console', lambda m: errs.append(m.text) if m.type == 'error' else None)
    pg.on('pageerror', lambda e: errs.append(str(e)))

    # drifter persona: never started, avoids fear -> expect a universal pattern (9-13)
    n1, d1 = run_quiz(pg, [4, 1, 4], 1, 'shot-d1')
    print('DRIFTER:', n1)
    print('  dare:', d1[:70])

    # doer persona: building, in progress, scared this month -> builder patterns
    n2, d2 = run_quiz(pg, [3, 3, 1], 1, 'shot-d2', False)
    print('DOER:', n2)

    # verdict card with dare
    with pg.expect_download() as dl:
        pg.click('#cardBtn')
    dl.value.save_as(out + 'verdict-card-sample.png')
    print('card ok')

    # deep link to a NEW universal pattern
    pg2 = b.new_page(viewport={'width': 1440, 'height': 920})
    pg2.goto(url + '#p12')
    pg2.wait_for_selector('#verdict.on', timeout=20000)
    time.sleep(2.2)
    pg2.screenshot(path=out + 'shot-d3-shared.png')
    print('SHARED #p12:', pg2.inner_text('#vName'), '| note:', pg2.is_visible('#sharedNote'))

    print('desktop errors:', errs if errs else 'none')

    # mobile drifter
    m = b.new_page(viewport={'width': 390, 'height': 844}, device_scale_factor=2, is_mobile=True)
    merr = []
    m.on('pageerror', lambda e: merr.append(str(e)))
    nm, dm = run_quiz(m, [1, 1, 3], 2, 'shot-m')
    print('MOBILE:', nm)
    print('mobile errors:', merr if merr else 'none')
    b.close()
print('OK')
