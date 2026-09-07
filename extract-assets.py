"""Crop the real assets out of the exported Figma frames.

The export is 1x and frame-exact, so crop boxes come straight from the
Figma coordinates. Section exports (Active Liveness, E-Nach) contain
several 430px frames on a tinted background; those are sliced first.
"""
import os
import numpy as np
from PIL import Image

SRC = "/home/claude/assets_in"
OUT = "/home/claude/pcg-loan-topup/src/assets/figma"
os.makedirs(OUT, exist_ok=True)


def load(path):
    im = Image.open(os.path.join(SRC, path)).convert("RGBA")
    flat = Image.new("RGBA", im.size, (255, 255, 255, 255))
    flat.alpha_composite(im)
    return flat.convert("RGB")


def trim(im, tol=14):
    """Trim uniform border colour, sampled from the four corners."""
    a = np.array(im).astype(int)
    corners = np.array(
        [a[0, 0], a[0, -1], a[-1, 0], a[-1, -1]]
    )
    bg = np.median(corners, axis=0)
    mask = np.abs(a - bg).sum(2) > tol
    if not mask.any():
        return im
    ys, xs = np.where(mask)
    return im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))


def save(im, name):
    p = os.path.join(OUT, name)
    im.save(p, optimize=True)
    print(f"{im.size[0]:>4}x{im.size[1]:<4} {name}")


def slice_section(path, xs, top, height=932):
    im = load(path)
    return [im.crop((x, top, x + 430, top + height)) for x in xs]


# ---- shared chrome ------------------------------------------------------
landing = load("Number + OTP/Default.png")
save(trim(landing.crop((16, 66, 220, 122))), "acme-logo.png")
save(trim(landing.crop((130, 862, 300, 902))), "perfios-logo.png")

# Landing hero. In Figma the image sits at x=-48 w=526; only 0..430 is
# ever visible, so the visible band is what we keep.
save(landing.crop((0, 122, 430, 532)), "hero-family.png")

# ---- offer illustration ------------------------------------------------
save(trim(load("Offer Screen.png").crop((24, 272, 406, 566))), "offer-illustration.png")

# ---- outcome marks -----------------------------------------------------
save(trim(load("Congratulations.png").crop((140, 195, 290, 295))), "mark-rupee.png")
save(trim(load("Congratulations 9.png").crop((140, 175, 290, 305))), "mark-success.png")

# ---- bank mark in the IFSC field --------------------------------------
save(trim(load("Deposite Account/Filled.png").crop((350, 262, 406, 308))), "axis-logo.png")

# ---- loaders -----------------------------------------------------------
for src, name in [
    ("Loader.png", "lottie-processing.png"),
    ("Loading.png", "lottie-verifying.png"),
    ("redirecting to nsdl.png", "lottie-nsdl.png"),
    ("redirecting to enach.png", "lottie-enach.png"),
]:
    save(load(src).crop((20, 271, 410, 661)), name)

# ---- iOS message mockup ------------------------------------------------
msg = load("Message 31.png")
save(msg.crop((0, 641, 430, 932)), "ios-keyboard.png")
save(trim(msg.crop((190, 52, 242, 104))), "msg-avatar.png")
save(trim(load("Notification - Collapsed.png").crop((10, 10, 56, 58))), "notif-app-icon.png")

# ---- NSDL e-sign page (a raster in the design) ------------------------
for src, name in [
    ("nsdl esign 73.png", "nsdl-page-aadhaar.png"),
    ("nsdl esign 74.png", "nsdl-page-aadhaar-filled.png"),
    ("nsdl esign 75.png", "nsdl-page-otp.png"),
    ("nsdl esign 76.png", "nsdl-page-otp-filled.png"),
]:
    save(load(src).crop((20, 154, 410, 737)), name)

# ---- Active Liveness section: 6 frames at 1x -------------------------
liv = slice_section(
    "Active Liveness.png", [127, 674, 1221, 1768, 2315, 2862], 106
)
save(liv[0].crop((0, 122, 430, 932)), "liveness-location-blur.png")
save(liv[1].crop((0, 122, 430, 691)), "liveness-camera.png")
save(liv[4].crop((55, 254, 375, 694)), "liveness-capture.png")

# ---- E-Nach section: 2 frames ----------------------------------------
en = slice_section("E-Nach.png", [132, 687], 120)
save(en[1].crop((24, 275, 406, 657)), "lottie-enach-loader.png")

print("\ntotal:", len(os.listdir(OUT)), "files")
