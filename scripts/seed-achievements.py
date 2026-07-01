import os
import json
import urllib.request
import urllib.error

# Read env
with open(os.path.join(os.path.dirname(__file__), '..', '.env.local')) as f:
    for line in f:
        line = line.strip()
        if line and not line.startswith('#'):
            k, v = line.split('=', 1)
            os.environ[k] = v

url = os.environ['NEXT_PUBLIC_SUPABASE_URL']
service_key = os.environ['SUPABASE_SERVICE_ROLE_KEY']

headers = {
    'apikey': service_key,
    'Authorization': f'Bearer {service_key}',
    'Content-Type': 'application/json',
    'Prefer': 'return=minimal'
}

def req(method, path, data=None):
    r = urllib.request.Request(f'{url}{path}', method=method, headers=headers)
    if data is not None:
        r.data = json.dumps(data).encode()
    try:
        resp = urllib.request.urlopen(r)
        body = resp.read()
        return body.decode() if body else ''
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f'  Error {method} {path}: {e.code} {body}')
        return None

# Step 1: Delete all existing achievements
print('Deleting existing achievements...')
req('DELETE', '/rest/v1/achievements?id=neq.00000000-0000-0000-0000-000000000000')
print('  Done.')

# Step 2: Insert real data
achievements = [
    {
        "title": "Taekwondo Bhirawa Championship Sragen",
        "description": "Juara 3 Taekwondo Bhirawa Championship Sragen",
        "category": "sports",
        "level": "local",
        "year": 2025,
        "students": ["Agsha Nararya Hasnain", "Rayyan", "Lintang", "Abdurrahman Azzam Al Fatih"],
        "ranking": 3,
        "featured": False
    },
    {
        "title": "Krenova Kabupaten Sragen",
        "description": "Juara 2 Lomba Krenova (Kreasi Inovasi) tingkat Kabupaten Sragen",
        "category": "academic",
        "level": "local",
        "year": 2025,
        "students": ["Fahimsyah Azzam", "Azzam Rasyidan", "Hadziq Maula"],
        "ranking": 2,
        "featured": False
    },
    {
        "title": "Krenova Subosukowonosraten",
        "description": "Juara Favorit Lomba Krenova tingkat Subosukowonosraten",
        "category": "academic",
        "level": "regional",
        "year": 2025,
        "students": ["Fahimsyah Azzam", "Azzam Rasyidan", "Hadziq Maula"],
        "ranking": 0,
        "featured": False
    },
    {
        "title": "Paskibra Kecamatan",
        "description": "Anggota Pasukan Pengibar Bendera tingkat Kecamatan",
        "category": "community",
        "level": "local",
        "year": 2025,
        "students": ["Fathan", "Waldan", "Erlangga"],
        "ranking": 0,
        "featured": False
    },
    {
        "title": "Kejurda Tapak Suci",
        "description": "Ahnaf (Emas), Nadif (Perunggu), Nazli (Perunggu), Ubaid (Perunggu) — Kejuaraan Daerah Tapak Suci",
        "category": "sports",
        "level": "regional",
        "year": 2025,
        "students": ["Ahnaf", "Nadif", "Nazli", "Ubaid"],
        "ranking": 1,
        "featured": False
    },
    {
        "title": "Ngawi Open",
        "description": "Nadif (Emas), Ahnaf (Emas), Amad Mubarok (Perak) — Turnamen Ngawi Open",
        "category": "sports",
        "level": "regional",
        "year": 2025,
        "students": ["Nadif", "Ahnaf", "Amad Mubarok"],
        "ranking": 1,
        "featured": False
    },
    {
        "title": "Ganesha Muda Universitas Tunas Pembangunan",
        "description": "Anap (Perak), Nadip (Perunggu), Filza (Perunggu), Nazli (Perunggu), Mirza (Perunggu)",
        "category": "sports",
        "level": "regional",
        "year": 2025,
        "students": ["Anap", "Nadip", "Filza", "Nazli", "Mirza"],
        "ranking": 2,
        "featured": False
    },
    {
        "title": "Olimpiade Madrasah Indonesia",
        "description": "Juara 1 Tingkat Kabupaten — Olimpiade Madrasah Indonesia",
        "category": "academic",
        "level": "national",
        "year": 2025,
        "students": ["Hadziq Maula Dinillah"],
        "ranking": 1,
        "featured": True
    },
    {
        "title": "Lomba Debat Indonesia",
        "description": "Top 1 Sragen — Lomba Debat Indonesia",
        "category": "academic",
        "level": "national",
        "year": 2025,
        "students": ["Fawwaz Abiyyu"],
        "ranking": 1,
        "featured": True
    },
]

print(f'\nInserting {len(achievements)} achievements...')
for i, a in enumerate(achievements):
    result = req('POST', '/rest/v1/achievements', a)
    print(f'  {i+1}. {a["title"]} ✓')

# Step 3: Verify
print('\nVerifying...')
r = urllib.request.Request(f'{url}/rest/v1/achievements?select=id,title,category,ranking&order=year.desc', headers=headers)
resp = urllib.request.urlopen(r)
data = json.loads(resp.read())
print(f'  Total: {len(data)} achievements')
for d in data:
    print(f'    [{d["category"]}] {d["title"]} (rank #{d["ranking"]})')
print('\n✅ Done!')
