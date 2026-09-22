import zipfile
from django.core.exceptions import ValidationError
from PIL import Image, UnidentifiedImageError

def validate_zip_integrity(file):
    if not file.name.lower().endswith('.zip'):
        return

    try:
        with zipfile.ZipFile(file) as zf:
            bad_file = zf.testzip()
            if bad_file is not None:
                raise ValidationError(f"Corrupted file inside archive: {bad_file}")
    except zipfile.BadZipFile:
        raise ValidationError("Uploaded file is not a valid zip archive or is corrupted.")
    finally:
        file.seek(0)

def validate_image_integrity(file):
    try:
        img = Image.open(file)
        img.verify()

    except (UnidentifiedImageError, OSError):
        raise ValidationError("Uploaded image is corrupted or not a valid image file.")
    finally:
        file.seek(0)
