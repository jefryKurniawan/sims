const Ziggy = {
    url: "http:\/\/localhost",
    port: null,
    defaults: {},
    routes: {
        "profile.sekolah": { uri: "profile-sekolah", methods: ["GET", "HEAD"] },
        "visimisi.sekolah": { uri: "visi-dan-misi", methods: ["GET", "HEAD"] },
        "program.index": { uri: "program", methods: ["GET", "HEAD"] },
        "program.studi": {
            uri: "program\/{slug}",
            methods: ["GET", "HEAD"],
            parameters: ["slug"],
        },
        kegiatan: {
            uri: "kegiatan\/{slug}",
            methods: ["GET", "HEAD"],
            parameters: ["slug"],
        },
        berita: { uri: "berita", methods: ["GET", "HEAD"] },
        "detail.berita": {
            uri: "berita\/{slug}",
            methods: ["GET", "HEAD"],
            parameters: ["slug"],
        },
        event: { uri: "event", methods: ["GET", "HEAD"] },
        "detail.event": {
            uri: "event\/{slug}",
            methods: ["GET", "HEAD"],
            parameters: ["slug"],
        },
        alumni: { uri: "alumni", methods: ["GET", "HEAD"] },
        "alumni.tracer-study": {
            uri: "alumni\/tracer-study",
            methods: ["GET", "HEAD"],
        },
        "alumni.forum": { uri: "alumni\/forum", methods: ["GET", "HEAD"] },
        "alumni.donasi": { uri: "alumni\/donasi", methods: ["GET", "HEAD"] },
        guru: { uri: "guru", methods: ["GET", "HEAD"] },
        "ppdb.frontend.register": {
            uri: "ppdb\/daftar",
            methods: ["GET", "HEAD"],
        },
        "ppdb.frontend.submit": { uri: "ppdb\/daftar", methods: ["POST"] },
        "ppdb.frontend.success": {
            uri: "ppdb\/sukses\/{token}",
            methods: ["GET", "HEAD"],
            parameters: ["token"],
        },
        "ppdb.frontend.edit": {
            uri: "ppdb\/edit\/{token}",
            methods: ["GET", "HEAD"],
            parameters: ["token"],
        },
        "ppdb.frontend.update": {
            uri: "ppdb\/edit\/{token}",
            methods: ["PUT"],
            parameters: ["token"],
        },
        "ppdb.frontend.check-status": {
            uri: "ppdb\/cek-status\/{token}",
            methods: ["GET", "HEAD"],
            parameters: ["token"],
        },
        "spmb.index": { uri: "spmb", methods: ["GET", "HEAD"] },
        "spmb.pendaftaran": { uri: "spmb\/daftar", methods: ["GET", "HEAD"] },
        "spmb.store": { uri: "spmb\/daftar", methods: ["POST"] },
        "spmb.berhasil": { uri: "spmb\/sukses", methods: ["GET", "HEAD"] },
        "spmb.cek-status": {
            uri: "spmb\/cek-status",
            methods: ["GET", "HEAD"],
        },
        "spmb.cek-status.post": { uri: "spmb\/cek-status", methods: ["POST"] },
        login: { uri: "auth\/login", methods: ["GET", "HEAD"] },
        logout: { uri: "auth\/logout", methods: ["POST"] },
        register: { uri: "auth\/register", methods: ["GET", "HEAD"] },
        dashboard: { uri: "dashboard", methods: ["GET", "HEAD"] },
        "profile-settings.index": {
            uri: "dashboard\/profile-settings",
            methods: ["GET", "HEAD"],
        },
        "profile-settings.create": {
            uri: "dashboard\/profile-settings\/create",
            methods: ["GET", "HEAD"],
        },
        "profile-settings.store": {
            uri: "dashboard\/profile-settings",
            methods: ["POST"],
        },
        "profile-settings.show": {
            uri: "dashboard\/profile-settings\/{profile_setting}",
            methods: ["GET", "HEAD"],
            parameters: ["profile_setting"],
        },
        "profile-settings.edit": {
            uri: "dashboard\/profile-settings\/{profile_setting}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["profile_setting"],
        },
        "profile-settings.update": {
            uri: "dashboard\/profile-settings\/{profile_setting}",
            methods: ["PUT", "PATCH"],
            parameters: ["profile_setting"],
        },
        "profile-settings.destroy": {
            uri: "dashboard\/profile-settings\/{profile_setting}",
            methods: ["DELETE"],
            parameters: ["profile_setting"],
        },
        "profile.change-password": {
            uri: "dashboard\/profile-settings\/change-password\/{id}",
            methods: ["PUT"],
            parameters: ["id"],
        },
        settings: { uri: "dashboard\/settings", methods: ["GET", "HEAD"] },
        "settings.add.bank": {
            uri: "dashboard\/settings\/add-bank",
            methods: ["POST"],
        },
        "settings.notifications": {
            uri: "dashboard\/settings\/notifications\/{id}",
            methods: ["PUT"],
            parameters: ["id"],
        },
        "siswa.index": { uri: "dashboard\/siswa", methods: ["GET", "HEAD"] },
        "siswa.create": {
            uri: "dashboard\/siswa\/create",
            methods: ["GET", "HEAD"],
        },
        "siswa.store": { uri: "dashboard\/siswa", methods: ["POST"] },
        "siswa.show": {
            uri: "dashboard\/siswa\/{siswa}",
            methods: ["GET", "HEAD"],
            parameters: ["siswa"],
        },
        "siswa.edit": {
            uri: "dashboard\/siswa\/{siswa}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["siswa"],
        },
        "siswa.update": {
            uri: "dashboard\/siswa\/{siswa}",
            methods: ["PUT", "PATCH"],
            parameters: ["siswa"],
        },
        "siswa.destroy": {
            uri: "dashboard\/siswa\/{siswa}",
            methods: ["DELETE"],
            parameters: ["siswa"],
        },
        "ppdb.seleksi.form": {
            uri: "dashboard\/ppdb\/seleksi",
            methods: ["GET", "HEAD"],
        },
        "ppdb.statistik": {
            uri: "dashboard\/ppdb\/statistik",
            methods: ["GET", "HEAD"],
        },
        "ppdb.index": { uri: "dashboard\/ppdb", methods: ["GET", "HEAD"] },
        "ppdb.create": {
            uri: "dashboard\/ppdb\/create",
            methods: ["GET", "HEAD"],
        },
        "ppdb.store": { uri: "dashboard\/ppdb", methods: ["POST"] },
        "ppdb.show": {
            uri: "dashboard\/ppdb\/{ppdb}",
            methods: ["GET", "HEAD"],
            parameters: ["ppdb"],
        },
        "ppdb.edit": {
            uri: "dashboard\/ppdb\/{ppdb}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["ppdb"],
        },
        "ppdb.update": {
            uri: "dashboard\/ppdb\/{ppdb}",
            methods: ["PUT", "PATCH"],
            parameters: ["ppdb"],
        },
        "ppdb.destroy": {
            uri: "dashboard\/ppdb\/{ppdb}",
            methods: ["DELETE"],
            parameters: ["ppdb"],
        },
        "ppdb.seleksi.proses": {
            uri: "dashboard\/ppdb\/seleksi",
            methods: ["POST"],
        },
        "ppdb.accept": {
            uri: "dashboard\/ppdb\/{calonSiswa}\/accept",
            methods: ["POST"],
            parameters: ["calonSiswa"],
            bindings: { calonSiswa: "id" },
        },
        "ppdb.reject": {
            uri: "dashboard\/ppdb\/{calonSiswa}\/reject",
            methods: ["POST"],
            parameters: ["calonSiswa"],
            bindings: { calonSiswa: "id" },
        },
        "ppdb.input-nilai": {
            uri: "dashboard\/ppdb\/{calonSiswa}\/input-nilai",
            methods: ["POST"],
            parameters: ["calonSiswa"],
            bindings: { calonSiswa: "id" },
        },
        "profile-sekolah.index": {
            uri: "dashboard\/website\/profile-sekolah",
            methods: ["GET", "HEAD"],
        },
        "profile-sekolah.create": {
            uri: "dashboard\/website\/profile-sekolah\/create",
            methods: ["GET", "HEAD"],
        },
        "profile-sekolah.store": {
            uri: "dashboard\/website\/profile-sekolah",
            methods: ["POST"],
        },
        "profile-sekolah.show": {
            uri: "dashboard\/website\/profile-sekolah\/{profile_sekolah}",
            methods: ["GET", "HEAD"],
            parameters: ["profile_sekolah"],
        },
        "profile-sekolah.edit": {
            uri: "dashboard\/website\/profile-sekolah\/{profile_sekolah}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["profile_sekolah"],
        },
        "profile-sekolah.update": {
            uri: "dashboard\/website\/profile-sekolah\/{profile_sekolah}",
            methods: ["PUT", "PATCH"],
            parameters: ["profile_sekolah"],
        },
        "profile-sekolah.destroy": {
            uri: "dashboard\/website\/profile-sekolah\/{profile_sekolah}",
            methods: ["DELETE"],
            parameters: ["profile_sekolah"],
        },
        "visimisi.index": {
            uri: "dashboard\/website\/visimisi",
            methods: ["GET", "HEAD"],
        },
        "visimisi.create": {
            uri: "dashboard\/website\/visimisi\/create",
            methods: ["GET", "HEAD"],
        },
        "visimisi.store": {
            uri: "dashboard\/website\/visimisi",
            methods: ["POST"],
        },
        "visimisi.show": {
            uri: "dashboard\/website\/visimisi\/{visimisi}",
            methods: ["GET", "HEAD"],
            parameters: ["visimisi"],
        },
        "visimisi.edit": {
            uri: "dashboard\/website\/visimisi\/{visimisi}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["visimisi"],
        },
        "visimisi.update": {
            uri: "dashboard\/website\/visimisi\/{visimisi}",
            methods: ["PUT", "PATCH"],
            parameters: ["visimisi"],
        },
        "visimisi.destroy": {
            uri: "dashboard\/website\/visimisi\/{visimisi}",
            methods: ["DELETE"],
            parameters: ["visimisi"],
        },
        "program-studi.index": {
            uri: "dashboard\/website\/program-studi",
            methods: ["GET", "HEAD"],
        },
        "program-studi.create": {
            uri: "dashboard\/website\/program-studi\/create",
            methods: ["GET", "HEAD"],
        },
        "program-studi.store": {
            uri: "dashboard\/website\/program-studi",
            methods: ["POST"],
        },
        "program-studi.show": {
            uri: "dashboard\/website\/program-studi\/{program_studi}",
            methods: ["GET", "HEAD"],
            parameters: ["program_studi"],
        },
        "program-studi.edit": {
            uri: "dashboard\/website\/program-studi\/{program_studi}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["program_studi"],
        },
        "program-studi.update": {
            uri: "dashboard\/website\/program-studi\/{program_studi}",
            methods: ["PUT", "PATCH"],
            parameters: ["program_studi"],
        },
        "program-studi.destroy": {
            uri: "dashboard\/website\/program-studi\/{program_studi}",
            methods: ["DELETE"],
            parameters: ["program_studi"],
        },
        "kegiatan.index": {
            uri: "dashboard\/website\/kegiatan",
            methods: ["GET", "HEAD"],
        },
        "kegiatan.create": {
            uri: "dashboard\/website\/kegiatan\/create",
            methods: ["GET", "HEAD"],
        },
        "kegiatan.store": {
            uri: "dashboard\/website\/kegiatan",
            methods: ["POST"],
        },
        "kegiatan.show": {
            uri: "dashboard\/website\/kegiatan\/{kegiatan}",
            methods: ["GET", "HEAD"],
            parameters: ["kegiatan"],
        },
        "kegiatan.edit": {
            uri: "dashboard\/website\/kegiatan\/{kegiatan}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["kegiatan"],
        },
        "kegiatan.update": {
            uri: "dashboard\/website\/kegiatan\/{kegiatan}",
            methods: ["PUT", "PATCH"],
            parameters: ["kegiatan"],
        },
        "kegiatan.destroy": {
            uri: "dashboard\/website\/kegiatan\/{kegiatan}",
            methods: ["DELETE"],
            parameters: ["kegiatan"],
        },
        "slider.index": {
            uri: "dashboard\/website\/slider",
            methods: ["GET", "HEAD"],
        },
        "slider.create": {
            uri: "dashboard\/website\/slider\/create",
            methods: ["GET", "HEAD"],
        },
        "slider.store": {
            uri: "dashboard\/website\/slider",
            methods: ["POST"],
        },
        "slider.show": {
            uri: "dashboard\/website\/slider\/{slider}",
            methods: ["GET", "HEAD"],
            parameters: ["slider"],
        },
        "slider.edit": {
            uri: "dashboard\/website\/slider\/{slider}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["slider"],
        },
        "slider.update": {
            uri: "dashboard\/website\/slider\/{slider}",
            methods: ["PUT", "PATCH"],
            parameters: ["slider"],
        },
        "slider.destroy": {
            uri: "dashboard\/website\/slider\/{slider}",
            methods: ["DELETE"],
            parameters: ["slider"],
        },
        "about.index": {
            uri: "dashboard\/website\/about",
            methods: ["GET", "HEAD"],
        },
        "about.create": {
            uri: "dashboard\/website\/about\/create",
            methods: ["GET", "HEAD"],
        },
        "about.store": { uri: "dashboard\/website\/about", methods: ["POST"] },
        "about.show": {
            uri: "dashboard\/website\/about\/{about}",
            methods: ["GET", "HEAD"],
            parameters: ["about"],
        },
        "about.edit": {
            uri: "dashboard\/website\/about\/{about}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["about"],
        },
        "about.update": {
            uri: "dashboard\/website\/about\/{about}",
            methods: ["PUT", "PATCH"],
            parameters: ["about"],
        },
        "about.destroy": {
            uri: "dashboard\/website\/about\/{about}",
            methods: ["DELETE"],
            parameters: ["about"],
        },
        "video.index": {
            uri: "dashboard\/website\/video",
            methods: ["GET", "HEAD"],
        },
        "video.create": {
            uri: "dashboard\/website\/video\/create",
            methods: ["GET", "HEAD"],
        },
        "video.store": { uri: "dashboard\/website\/video", methods: ["POST"] },
        "video.show": {
            uri: "dashboard\/website\/video\/{video}",
            methods: ["GET", "HEAD"],
            parameters: ["video"],
        },
        "video.edit": {
            uri: "dashboard\/website\/video\/{video}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["video"],
        },
        "video.update": {
            uri: "dashboard\/website\/video\/{video}",
            methods: ["PUT", "PATCH"],
            parameters: ["video"],
        },
        "video.destroy": {
            uri: "dashboard\/website\/video\/{video}",
            methods: ["DELETE"],
            parameters: ["video"],
        },
        "kategori-berita.index": {
            uri: "dashboard\/website\/kategori-berita",
            methods: ["GET", "HEAD"],
        },
        "kategori-berita.create": {
            uri: "dashboard\/website\/kategori-berita\/create",
            methods: ["GET", "HEAD"],
        },
        "kategori-berita.store": {
            uri: "dashboard\/website\/kategori-berita",
            methods: ["POST"],
        },
        "kategori-berita.show": {
            uri: "dashboard\/website\/kategori-berita\/{kategori_beritum}",
            methods: ["GET", "HEAD"],
            parameters: ["kategori_beritum"],
        },
        "kategori-berita.edit": {
            uri: "dashboard\/website\/kategori-berita\/{kategori_beritum}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["kategori_beritum"],
        },
        "kategori-berita.update": {
            uri: "dashboard\/website\/kategori-berita\/{kategori_beritum}",
            methods: ["PUT", "PATCH"],
            parameters: ["kategori_beritum"],
        },
        "kategori-berita.destroy": {
            uri: "dashboard\/website\/kategori-berita\/{kategori_beritum}",
            methods: ["DELETE"],
            parameters: ["kategori_beritum"],
        },
        "berita.index": {
            uri: "dashboard\/website\/berita",
            methods: ["GET", "HEAD"],
        },
        "berita.create": {
            uri: "dashboard\/website\/berita\/create",
            methods: ["GET", "HEAD"],
        },
        "berita.store": {
            uri: "dashboard\/website\/berita",
            methods: ["POST"],
        },
        "berita.show": {
            uri: "dashboard\/website\/berita\/{beritum}",
            methods: ["GET", "HEAD"],
            parameters: ["beritum"],
        },
        "berita.edit": {
            uri: "dashboard\/website\/berita\/{beritum}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["beritum"],
        },
        "berita.update": {
            uri: "dashboard\/website\/berita\/{beritum}",
            methods: ["PUT", "PATCH"],
            parameters: ["beritum"],
        },
        "berita.destroy": {
            uri: "dashboard\/website\/berita\/{beritum}",
            methods: ["DELETE"],
            parameters: ["beritum"],
        },
        "event.index": {
            uri: "dashboard\/website\/event",
            methods: ["GET", "HEAD"],
        },
        "event.create": {
            uri: "dashboard\/website\/event\/create",
            methods: ["GET", "HEAD"],
        },
        "event.store": { uri: "dashboard\/website\/event", methods: ["POST"] },
        "event.show": {
            uri: "dashboard\/website\/event\/{event}",
            methods: ["GET", "HEAD"],
            parameters: ["event"],
        },
        "event.edit": {
            uri: "dashboard\/website\/event\/{event}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["event"],
        },
        "event.update": {
            uri: "dashboard\/website\/event\/{event}",
            methods: ["PUT", "PATCH"],
            parameters: ["event"],
        },
        "event.destroy": {
            uri: "dashboard\/website\/event\/{event}",
            methods: ["DELETE"],
            parameters: ["event"],
        },
        "footer.index": {
            uri: "dashboard\/website\/footer",
            methods: ["GET", "HEAD"],
        },
        "footer.create": {
            uri: "dashboard\/website\/footer\/create",
            methods: ["GET", "HEAD"],
        },
        "footer.store": {
            uri: "dashboard\/website\/footer",
            methods: ["POST"],
        },
        "footer.show": {
            uri: "dashboard\/website\/footer\/{footer}",
            methods: ["GET", "HEAD"],
            parameters: ["footer"],
        },
        "footer.edit": {
            uri: "dashboard\/website\/footer\/{footer}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["footer"],
        },
        "footer.update": {
            uri: "dashboard\/website\/footer\/{footer}",
            methods: ["PUT", "PATCH"],
            parameters: ["footer"],
        },
        "footer.destroy": {
            uri: "dashboard\/website\/footer\/{footer}",
            methods: ["DELETE"],
            parameters: ["footer"],
        },
        "alumni.template": {
            uri: "dashboard\/alumni\/template",
            methods: ["GET", "HEAD"],
        },
        "alumni.import": {
            uri: "dashboard\/alumni\/import",
            methods: ["POST"],
        },
        "alumni.index": { uri: "dashboard\/alumni", methods: ["GET", "HEAD"] },
        "alumni.create": {
            uri: "dashboard\/alumni\/create",
            methods: ["GET", "HEAD"],
        },
        "alumni.store": { uri: "dashboard\/alumni", methods: ["POST"] },
        "alumni.show": {
            uri: "dashboard\/alumni\/{alumni}",
            methods: ["GET", "HEAD"],
            parameters: ["alumni"],
        },
        "alumni.edit": {
            uri: "dashboard\/alumni\/{alumni}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["alumni"],
            bindings: { alumni: "id" },
        },
        "alumni.update": {
            uri: "dashboard\/alumni\/{alumni}",
            methods: ["PUT", "PATCH"],
            parameters: ["alumni"],
            bindings: { alumni: "id" },
        },
        "alumni.destroy": {
            uri: "dashboard\/alumni\/{alumni}",
            methods: ["DELETE"],
            parameters: ["alumni"],
            bindings: { alumni: "id" },
        },
        "alumni.donasi.index": {
            uri: "dashboard\/alumni\/donasi",
            methods: ["GET", "HEAD"],
        },
        "alumni.donasi.create": {
            uri: "dashboard\/alumni\/donasi\/create",
            methods: ["GET", "HEAD"],
        },
        "alumni.donasi.store": {
            uri: "dashboard\/alumni\/donasi",
            methods: ["POST"],
        },
        "alumni.donasi.show": {
            uri: "dashboard\/alumni\/donasi\/{donasi}",
            methods: ["GET", "HEAD"],
            parameters: ["donasi"],
            bindings: { donasi: "id" },
        },
        "alumni.donasi.edit": {
            uri: "dashboard\/alumni\/donasi\/{donasi}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["donasi"],
            bindings: { donasi: "id" },
        },
        "alumni.donasi.update": {
            uri: "dashboard\/alumni\/donasi\/{donasi}",
            methods: ["PUT", "PATCH"],
            parameters: ["donasi"],
            bindings: { donasi: "id" },
        },
        "alumni.donasi.destroy": {
            uri: "dashboard\/alumni\/donasi\/{donasi}",
            methods: ["DELETE"],
            parameters: ["donasi"],
            bindings: { donasi: "id" },
        },
        "alumni.donasi.verify": {
            uri: "dashboard\/alumni\/donasi\/{donasi}\/verify",
            methods: ["POST"],
            parameters: ["donasi"],
            bindings: { donasi: "id" },
        },
        "alumni.tracer-study.index": {
            uri: "dashboard\/alumni\/tracer-study",
            methods: ["GET", "HEAD"],
        },
        "alumni.tracer-study.create": {
            uri: "dashboard\/alumni\/tracer-study\/create",
            methods: ["GET", "HEAD"],
        },
        "alumni.tracer-study.store": {
            uri: "dashboard\/alumni\/tracer-study",
            methods: ["POST"],
        },
        "alumni.tracer-study.show": {
            uri: "dashboard\/alumni\/tracer-study\/{tracer_study}",
            methods: ["GET", "HEAD"],
            parameters: ["tracer_study"],
        },
        "alumni.tracer-study.edit": {
            uri: "dashboard\/alumni\/tracer-study\/{tracer_study}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["tracer_study"],
        },
        "alumni.tracer-study.update": {
            uri: "dashboard\/alumni\/tracer-study\/{tracer_study}",
            methods: ["PUT", "PATCH"],
            parameters: ["tracer_study"],
        },
        "alumni.tracer-study.destroy": {
            uri: "dashboard\/alumni\/tracer-study\/{tracer_study}",
            methods: ["DELETE"],
            parameters: ["tracer_study"],
        },
        "berita-admin.index": {
            uri: "dashboard\/berita-admin",
            methods: ["GET", "HEAD"],
        },
        "berita-admin.create": {
            uri: "dashboard\/berita-admin\/create",
            methods: ["GET", "HEAD"],
        },
        "berita-admin.store": {
            uri: "dashboard\/berita-admin",
            methods: ["POST"],
        },
        "berita-admin.show": {
            uri: "dashboard\/berita-admin\/{berita_admin}",
            methods: ["GET", "HEAD"],
            parameters: ["berita_admin"],
        },
        "berita-admin.edit": {
            uri: "dashboard\/berita-admin\/{berita_admin}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["berita_admin"],
        },
        "berita-admin.update": {
            uri: "dashboard\/berita-admin\/{berita_admin}",
            methods: ["PUT", "PATCH"],
            parameters: ["berita_admin"],
        },
        "berita-admin.destroy": {
            uri: "dashboard\/berita-admin\/{berita_admin}",
            methods: ["DELETE"],
            parameters: ["berita_admin"],
        },
        "users.pengajar.index": {
            uri: "dashboard\/users\/pengajar",
            methods: ["GET", "HEAD"],
        },
        "users.pengajar.create": {
            uri: "dashboard\/users\/pengajar\/create",
            methods: ["GET", "HEAD"],
        },
        "users.pengajar.store": {
            uri: "dashboard\/users\/pengajar",
            methods: ["POST"],
        },
        "users.pengajar.show": {
            uri: "dashboard\/users\/pengajar\/{pengajar}",
            methods: ["GET", "HEAD"],
            parameters: ["pengajar"],
        },
        "users.pengajar.edit": {
            uri: "dashboard\/users\/pengajar\/{pengajar}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["pengajar"],
        },
        "users.pengajar.update": {
            uri: "dashboard\/users\/pengajar\/{pengajar}",
            methods: ["PUT", "PATCH"],
            parameters: ["pengajar"],
        },
        "users.pengajar.destroy": {
            uri: "dashboard\/users\/pengajar\/{pengajar}",
            methods: ["DELETE"],
            parameters: ["pengajar"],
        },
        "users.staf.index": {
            uri: "dashboard\/users\/staf",
            methods: ["GET", "HEAD"],
        },
        "users.staf.create": {
            uri: "dashboard\/users\/staf\/create",
            methods: ["GET", "HEAD"],
        },
        "users.staf.store": {
            uri: "dashboard\/users\/staf",
            methods: ["POST"],
        },
        "users.staf.show": {
            uri: "dashboard\/users\/staf\/{staf}",
            methods: ["GET", "HEAD"],
            parameters: ["staf"],
        },
        "users.staf.edit": {
            uri: "dashboard\/users\/staf\/{staf}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["staf"],
        },
        "users.staf.update": {
            uri: "dashboard\/users\/staf\/{staf}",
            methods: ["PUT", "PATCH"],
            parameters: ["staf"],
        },
        "users.staf.destroy": {
            uri: "dashboard\/users\/staf\/{staf}",
            methods: ["DELETE"],
            parameters: ["staf"],
        },
        "users.murid.template": {
            uri: "dashboard\/users\/murid\/template",
            methods: ["GET", "HEAD"],
        },
        "users.murid.import": {
            uri: "dashboard\/users\/murid\/import",
            methods: ["POST"],
        },
        "users.murid.tingkat": {
            uri: "dashboard\/users\/murid\/tingkat\/{tingkat}",
            methods: ["GET", "HEAD"],
            wheres: { tingkat: "[0-9]+" },
            parameters: ["tingkat"],
        },
        "users.murid.promote": {
            uri: "dashboard\/users\/murid\/promote",
            methods: ["POST"],
        },
        "users.murid.index": {
            uri: "dashboard\/users\/murid",
            methods: ["GET", "HEAD"],
        },
        "users.murid.create": {
            uri: "dashboard\/users\/murid\/create",
            methods: ["GET", "HEAD"],
        },
        "users.murid.store": {
            uri: "dashboard\/users\/murid",
            methods: ["POST"],
        },
        "users.murid.show": {
            uri: "dashboard\/users\/murid\/{murid}",
            methods: ["GET", "HEAD"],
            parameters: ["murid"],
        },
        "users.murid.edit": {
            uri: "dashboard\/users\/murid\/{murid}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["murid"],
        },
        "users.murid.update": {
            uri: "dashboard\/users\/murid\/{murid}",
            methods: ["PUT", "PATCH"],
            parameters: ["murid"],
        },
        "users.murid.destroy": {
            uri: "dashboard\/users\/murid\/{murid}",
            methods: ["DELETE"],
            parameters: ["murid"],
        },
        "users.ppdb.index": {
            uri: "dashboard\/users\/ppdb",
            methods: ["GET", "HEAD"],
        },
        "users.ppdb.create": {
            uri: "dashboard\/users\/ppdb\/create",
            methods: ["GET", "HEAD"],
        },
        "users.ppdb.store": {
            uri: "dashboard\/users\/ppdb",
            methods: ["POST"],
        },
        "users.ppdb.show": {
            uri: "dashboard\/users\/ppdb\/{ppdb}",
            methods: ["GET", "HEAD"],
            parameters: ["ppdb"],
        },
        "users.ppdb.edit": {
            uri: "dashboard\/users\/ppdb\/{ppdb}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["ppdb"],
        },
        "users.ppdb.update": {
            uri: "dashboard\/users\/ppdb\/{ppdb}",
            methods: ["PUT", "PATCH"],
            parameters: ["ppdb"],
        },
        "users.ppdb.destroy": {
            uri: "dashboard\/users\/ppdb\/{ppdb}",
            methods: ["DELETE"],
            parameters: ["ppdb"],
        },
        "users.perpus.index": {
            uri: "dashboard\/users\/perpus",
            methods: ["GET", "HEAD"],
        },
        "users.perpus.create": {
            uri: "dashboard\/users\/perpus\/create",
            methods: ["GET", "HEAD"],
        },
        "users.perpus.store": {
            uri: "dashboard\/users\/perpus",
            methods: ["POST"],
        },
        "users.perpus.show": {
            uri: "dashboard\/users\/perpus\/{perpu}",
            methods: ["GET", "HEAD"],
            parameters: ["perpu"],
        },
        "users.perpus.edit": {
            uri: "dashboard\/users\/perpus\/{perpu}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["perpu"],
        },
        "users.perpus.update": {
            uri: "dashboard\/users\/perpus\/{perpu}",
            methods: ["PUT", "PATCH"],
            parameters: ["perpu"],
        },
        "users.perpus.destroy": {
            uri: "dashboard\/users\/perpus\/{perpu}",
            methods: ["DELETE"],
            parameters: ["perpu"],
        },
        "users.bendahara.index": {
            uri: "dashboard\/users\/bendahara",
            methods: ["GET", "HEAD"],
        },
        "users.bendahara.create": {
            uri: "dashboard\/users\/bendahara\/create",
            methods: ["GET", "HEAD"],
        },
        "users.bendahara.store": {
            uri: "dashboard\/users\/bendahara",
            methods: ["POST"],
        },
        "users.bendahara.show": {
            uri: "dashboard\/users\/bendahara\/{bendahara}",
            methods: ["GET", "HEAD"],
            parameters: ["bendahara"],
        },
        "users.bendahara.edit": {
            uri: "dashboard\/users\/bendahara\/{bendahara}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["bendahara"],
        },
        "users.bendahara.update": {
            uri: "dashboard\/users\/bendahara\/{bendahara}",
            methods: ["PUT", "PATCH"],
            parameters: ["bendahara"],
        },
        "users.bendahara.destroy": {
            uri: "dashboard\/users\/bendahara\/{bendahara}",
            methods: ["DELETE"],
            parameters: ["bendahara"],
        },
        "admin.prestasi.index": {
            uri: "dashboard\/prestasi",
            methods: ["GET", "HEAD"],
        },
        "admin.prestasi.create": {
            uri: "dashboard\/prestasi\/create",
            methods: ["GET", "HEAD"],
        },
        "admin.prestasi.store": {
            uri: "dashboard\/prestasi",
            methods: ["POST"],
        },
        "admin.prestasi.show": {
            uri: "dashboard\/prestasi\/{prestasi}",
            methods: ["GET", "HEAD"],
            parameters: ["prestasi"],
            bindings: { prestasi: "id" },
        },
        "admin.prestasi.edit": {
            uri: "dashboard\/prestasi\/{prestasi}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["prestasi"],
            bindings: { prestasi: "id" },
        },
        "admin.prestasi.update": {
            uri: "dashboard\/prestasi\/{prestasi}",
            methods: ["PUT", "PATCH"],
            parameters: ["prestasi"],
            bindings: { prestasi: "id" },
        },
        "admin.prestasi.destroy": {
            uri: "dashboard\/prestasi\/{prestasi}",
            methods: ["DELETE"],
            parameters: ["prestasi"],
            bindings: { prestasi: "id" },
        },
        "dispensasi.index": {
            uri: "dashboard\/dispensasi",
            methods: ["GET", "HEAD"],
        },
        "dispensasi.create": {
            uri: "dashboard\/dispensasi\/create",
            methods: ["GET", "HEAD"],
        },
        "dispensasi.store": { uri: "dashboard\/dispensasi", methods: ["POST"] },
        "dispensasi.show": {
            uri: "dashboard\/dispensasi\/{dispensasi}",
            methods: ["GET", "HEAD"],
            parameters: ["dispensasi"],
            bindings: { dispensasi: "id" },
        },
        "dispensasi.edit": {
            uri: "dashboard\/dispensasi\/{dispensasi}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["dispensasi"],
            bindings: { dispensasi: "id" },
        },
        "dispensasi.update": {
            uri: "dashboard\/dispensasi\/{dispensasi}",
            methods: ["PUT", "PATCH"],
            parameters: ["dispensasi"],
            bindings: { dispensasi: "id" },
        },
        "dispensasi.destroy": {
            uri: "dashboard\/dispensasi\/{dispensasi}",
            methods: ["DELETE"],
            parameters: ["dispensasi"],
            bindings: { dispensasi: "id" },
        },
        "rapor-kelas.create": {
            uri: "dashboard\/rapor-kelas\/create",
            methods: ["GET", "HEAD"],
        },
        "rapor-kelas.store": {
            uri: "dashboard\/rapor-kelas",
            methods: ["POST"],
        },
        "rapor-kelas.index": {
            uri: "dashboard\/rapor-kelas",
            methods: ["GET", "HEAD"],
        },
        "rapor-kelas.edit": {
            uri: "dashboard\/rapor-kelas\/{raporKelas}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["raporKelas"],
            bindings: { raporKelas: "id" },
        },
        "rapor-kelas.update": {
            uri: "dashboard\/rapor-kelas\/{raporKelas}",
            methods: ["PUT"],
            parameters: ["raporKelas"],
            bindings: { raporKelas: "id" },
        },
        "rapor-kelas.destroy": {
            uri: "dashboard\/rapor-kelas\/{raporKelas}",
            methods: ["DELETE"],
            parameters: ["raporKelas"],
            bindings: { raporKelas: "id" },
        },
        "rapor-mapel.create": {
            uri: "dashboard\/rapor-mapel\/create",
            methods: ["GET", "HEAD"],
        },
        "rapor-mapel.store": {
            uri: "dashboard\/rapor-mapel",
            methods: ["POST"],
        },
        "rapor-mapel.index": {
            uri: "dashboard\/rapor-mapel",
            methods: ["GET", "HEAD"],
        },
        "rapor-mapel.edit": {
            uri: "dashboard\/rapor-mapel\/{raporMapel}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["raporMapel"],
            bindings: { raporMapel: "id" },
        },
        "rapor-mapel.update": {
            uri: "dashboard\/rapor-mapel\/{raporMapel}",
            methods: ["PUT"],
            parameters: ["raporMapel"],
            bindings: { raporMapel: "id" },
        },
        "rapor-mapel.destroy": {
            uri: "dashboard\/rapor-mapel\/{raporMapel}",
            methods: ["DELETE"],
            parameters: ["raporMapel"],
            bindings: { raporMapel: "id" },
        },
        "rapor-siswa.index": {
            uri: "dashboard\/rapor-siswa",
            methods: ["GET", "HEAD"],
        },
        "rapor-siswa.assign": {
            uri: "dashboard\/rapor-siswa\/assign",
            methods: ["GET", "HEAD"],
        },
        "rapor-siswa.assign-store": {
            uri: "dashboard\/rapor-siswa\/assign",
            methods: ["POST"],
        },
        "rapor-siswa.statistik": {
            uri: "dashboard\/rapor-siswa\/statistik",
            methods: ["GET", "HEAD"],
        },
        "rapor-siswa.show": {
            uri: "dashboard\/rapor-siswa\/{raporSiswa}",
            methods: ["GET", "HEAD"],
            parameters: ["raporSiswa"],
            bindings: { raporSiswa: "id" },
        },
        "rapor-siswa.input-nilai": {
            uri: "dashboard\/rapor-siswa\/{raporSiswa}\/input-nilai",
            methods: ["GET", "HEAD"],
            parameters: ["raporSiswa"],
            bindings: { raporSiswa: "id" },
        },
        "rapor-siswa.input-nilai-store": {
            uri: "dashboard\/rapor-siswa\/{raporSiswa}\/input-nilai",
            methods: ["POST"],
            parameters: ["raporSiswa"],
            bindings: { raporSiswa: "id" },
        },
        "rapor-siswa.generate-deskripsi": {
            uri: "dashboard\/rapor-siswa\/{raporSiswa}\/generate-deskripsi",
            methods: ["POST"],
            parameters: ["raporSiswa"],
            bindings: { raporSiswa: "id" },
        },
        "rapor-siswa.ekstrakurikuler": {
            uri: "dashboard\/rapor-siswa\/{raporSiswa}\/ekstrakurikuler",
            methods: ["POST"],
            parameters: ["raporSiswa"],
            bindings: { raporSiswa: "id" },
        },
        "rapor-siswa.hapus-ekstrakurikuler": {
            uri: "dashboard\/rapor-siswa\/ekstrakurikuler\/{raporEkstrakurikuler}",
            methods: ["DELETE"],
            parameters: ["raporEkstrakurikuler"],
            bindings: { raporEkstrakurikuler: "id" },
        },
        "rapor-siswa.catatan": {
            uri: "dashboard\/rapor-siswa\/{raporSiswa}\/catatan",
            methods: ["POST"],
            parameters: ["raporSiswa"],
            bindings: { raporSiswa: "id" },
        },
        "rapor-siswa.destroy": {
            uri: "dashboard\/rapor-siswa\/{raporSiswa}",
            methods: ["DELETE"],
            parameters: ["raporSiswa"],
            bindings: { raporSiswa: "id" },
        },
        "erapor.dapodik-sync": {
            uri: "dashboard\/erapor\/dapodik-sync",
            methods: ["GET", "HEAD"],
        },
        "erapor.dapodik-sync.manual": {
            uri: "dashboard\/erapor\/dapodik-sync\/manual",
            methods: ["POST"],
        },
        "erapor.dapodik-sync.pull": {
            uri: "dashboard\/erapor\/dapodik-sync\/pull",
            methods: ["POST"],
        },
        "erapor.tujuan-pembelajaran.index": {
            uri: "dashboard\/erapor\/tujuan-pembelajaran",
            methods: ["GET", "HEAD"],
        },
        "erapor.tujuan-pembelajaran.create": {
            uri: "dashboard\/erapor\/tujuan-pembelajaran\/create",
            methods: ["GET", "HEAD"],
        },
        "erapor.tujuan-pembelajaran.store": {
            uri: "dashboard\/erapor\/tujuan-pembelajaran",
            methods: ["POST"],
        },
        "erapor.tujuan-pembelajaran.edit": {
            uri: "dashboard\/erapor\/tujuan-pembelajaran\/{tujuanPembelajaran}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["tujuanPembelajaran"],
            bindings: { tujuanPembelajaran: "id" },
        },
        "erapor.tujuan-pembelajaran.update": {
            uri: "dashboard\/erapor\/tujuan-pembelajaran\/{tujuanPembelajaran}",
            methods: ["PUT"],
            parameters: ["tujuanPembelajaran"],
            bindings: { tujuanPembelajaran: "id" },
        },
        "erapor.tujuan-pembelajaran.destroy": {
            uri: "dashboard\/erapor\/tujuan-pembelajaran\/{tujuanPembelajaran}",
            methods: ["DELETE"],
            parameters: ["tujuanPembelajaran"],
            bindings: { tujuanPembelajaran: "id" },
        },
        "erapor.tujuan-pembelajaran.import": {
            uri: "dashboard\/erapor\/tujuan-pembelajaran\/import",
            methods: ["POST"],
        },
        "erapor.nilai.index": {
            uri: "dashboard\/erapor\/nilai",
            methods: ["GET", "HEAD"],
        },
        "erapor.nilai.input": {
            uri: "dashboard\/erapor\/nilai\/input",
            methods: ["GET", "HEAD"],
        },
        "erapor.nilai.store-formatif": {
            uri: "dashboard\/erapor\/nilai\/formatif",
            methods: ["POST"],
        },
        "erapor.nilai.store-sumatif": {
            uri: "dashboard\/erapor\/nilai\/sumatif",
            methods: ["POST"],
        },
        "erapor.nilai.export": {
            uri: "dashboard\/erapor\/nilai\/export",
            methods: ["GET", "HEAD"],
        },
        "erapor.nilai.import": {
            uri: "dashboard\/erapor\/nilai\/import",
            methods: ["POST"],
        },
        "erapor.p5.index": {
            uri: "dashboard\/erapor\/p5",
            methods: ["GET", "HEAD"],
        },
        "erapor.p5.create": {
            uri: "dashboard\/erapor\/p5\/create",
            methods: ["GET", "HEAD"],
        },
        "erapor.p5.store": { uri: "dashboard\/erapor\/p5", methods: ["POST"] },
        "erapor.p5.edit": {
            uri: "dashboard\/erapor\/p5\/{p5Projek}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["p5Projek"],
            bindings: { p5Projek: "id" },
        },
        "erapor.p5.update": {
            uri: "dashboard\/erapor\/p5\/{p5Projek}",
            methods: ["PUT"],
            parameters: ["p5Projek"],
            bindings: { p5Projek: "id" },
        },
        "erapor.p5.destroy": {
            uri: "dashboard\/erapor\/p5\/{p5Projek}",
            methods: ["DELETE"],
            parameters: ["p5Projek"],
            bindings: { p5Projek: "id" },
        },
        "erapor.p5.input-nilai": {
            uri: "dashboard\/erapor\/p5\/{p5Projek}\/input-nilai",
            methods: ["GET", "HEAD"],
            parameters: ["p5Projek"],
            bindings: { p5Projek: "id" },
        },
        "erapor.p5.store-nilai": {
            uri: "dashboard\/erapor\/p5\/{p5Projek}\/input-nilai",
            methods: ["POST"],
            parameters: ["p5Projek"],
            bindings: { p5Projek: "id" },
        },
        "gtk.template": {
            uri: "dashboard\/gtk\/template",
            methods: ["GET", "HEAD"],
        },
        "gtk.import": { uri: "dashboard\/gtk\/import", methods: ["POST"] },
        "gtk.index": { uri: "dashboard\/gtk", methods: ["GET", "HEAD"] },
        "gtk.create": {
            uri: "dashboard\/gtk\/create",
            methods: ["GET", "HEAD"],
        },
        "gtk.store": { uri: "dashboard\/gtk", methods: ["POST"] },
        "gtk.show": {
            uri: "dashboard\/gtk\/{gtk}",
            methods: ["GET", "HEAD"],
            parameters: ["gtk"],
            bindings: { gtk: "id" },
        },
        "gtk.edit": {
            uri: "dashboard\/gtk\/{gtk}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["gtk"],
            bindings: { gtk: "id" },
        },
        "gtk.update": {
            uri: "dashboard\/gtk\/{gtk}",
            methods: ["PUT", "PATCH"],
            parameters: ["gtk"],
            bindings: { gtk: "id" },
        },
        "gtk.destroy": {
            uri: "dashboard\/gtk\/{gtk}",
            methods: ["DELETE"],
            parameters: ["gtk"],
            bindings: { gtk: "id" },
        },
        "kelas.template": {
            uri: "dashboard\/kelas\/template",
            methods: ["GET", "HEAD"],
        },
        "kelas.import": { uri: "dashboard\/kelas\/import", methods: ["POST"] },
        "kelas.index": { uri: "dashboard\/kelas", methods: ["GET", "HEAD"] },
        "kelas.create": {
            uri: "dashboard\/kelas\/create",
            methods: ["GET", "HEAD"],
        },
        "kelas.store": { uri: "dashboard\/kelas", methods: ["POST"] },
        "kelas.show": {
            uri: "dashboard\/kelas\/{kela}",
            methods: ["GET", "HEAD"],
            parameters: ["kela"],
            bindings: { kela: "id" },
        },
        "kelas.edit": {
            uri: "dashboard\/kelas\/{kela}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["kela"],
            bindings: { kela: "id" },
        },
        "kelas.update": {
            uri: "dashboard\/kelas\/{kela}",
            methods: ["PUT", "PATCH"],
            parameters: ["kela"],
            bindings: { kela: "id" },
        },
        "kelas.destroy": {
            uri: "dashboard\/kelas\/{kela}",
            methods: ["DELETE"],
            parameters: ["kela"],
            bindings: { kela: "id" },
        },
        "sarana.template": {
            uri: "dashboard\/sarana\/template",
            methods: ["GET", "HEAD"],
        },
        "sarana.import": {
            uri: "dashboard\/sarana\/import",
            methods: ["POST"],
        },
        "sarana.index": { uri: "dashboard\/sarana", methods: ["GET", "HEAD"] },
        "sarana.create": {
            uri: "dashboard\/sarana\/create",
            methods: ["GET", "HEAD"],
        },
        "sarana.store": { uri: "dashboard\/sarana", methods: ["POST"] },
        "sarana.show": {
            uri: "dashboard\/sarana\/{sarana}",
            methods: ["GET", "HEAD"],
            parameters: ["sarana"],
            bindings: { sarana: "id" },
        },
        "sarana.edit": {
            uri: "dashboard\/sarana\/{sarana}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["sarana"],
            bindings: { sarana: "id" },
        },
        "sarana.update": {
            uri: "dashboard\/sarana\/{sarana}",
            methods: ["PUT", "PATCH"],
            parameters: ["sarana"],
            bindings: { sarana: "id" },
        },
        "sarana.destroy": {
            uri: "dashboard\/sarana\/{sarana}",
            methods: ["DELETE"],
            parameters: ["sarana"],
            bindings: { sarana: "id" },
        },
        "admin.perpustakaan.template": {
            uri: "dashboard\/perpustakaan\/template",
            methods: ["GET", "HEAD"],
        },
        "admin.perpustakaan.import": {
            uri: "dashboard\/perpustakaan\/import",
            methods: ["POST"],
        },
        "admin.perpustakaan.index": {
            uri: "dashboard\/perpustakaan",
            methods: ["GET", "HEAD"],
        },
        "admin.perpustakaan.create": {
            uri: "dashboard\/perpustakaan\/create",
            methods: ["GET", "HEAD"],
        },
        "admin.perpustakaan.store": {
            uri: "dashboard\/perpustakaan",
            methods: ["POST"],
        },
        "admin.perpustakaan.show": {
            uri: "dashboard\/perpustakaan\/{buku}",
            methods: ["GET", "HEAD"],
            parameters: ["buku"],
            bindings: { buku: "id" },
        },
        "admin.perpustakaan.edit": {
            uri: "dashboard\/perpustakaan\/{buku}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["buku"],
            bindings: { buku: "id" },
        },
        "admin.perpustakaan.update": {
            uri: "dashboard\/perpustakaan\/{buku}",
            methods: ["PUT", "PATCH"],
            parameters: ["buku"],
            bindings: { buku: "id" },
        },
        "admin.perpustakaan.destroy": {
            uri: "dashboard\/perpustakaan\/{buku}",
            methods: ["DELETE"],
            parameters: ["buku"],
            bindings: { buku: "id" },
        },
        "spp.index": { uri: "dashboard\/spp", methods: ["GET", "HEAD"] },
        "spp.create": {
            uri: "dashboard\/spp\/create",
            methods: ["GET", "HEAD"],
        },
        "spp.store": { uri: "dashboard\/spp", methods: ["POST"] },
        "spp.show": {
            uri: "dashboard\/spp\/{spp}",
            methods: ["GET", "HEAD"],
            parameters: ["spp"],
        },
        "spp.edit": {
            uri: "dashboard\/spp\/{spp}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["spp"],
        },
        "spp.update": {
            uri: "dashboard\/spp\/{spp}",
            methods: ["PUT", "PATCH"],
            parameters: ["spp"],
        },
        "spp.destroy": {
            uri: "dashboard\/spp\/{spp}",
            methods: ["DELETE"],
            parameters: ["spp"],
        },
        "spmb.applicant.index": {
            uri: "dashboard\/spmb\/applicant",
            methods: ["GET", "HEAD"],
        },
        "spmb.applicant.show": {
            uri: "dashboard\/spmb\/applicant\/{spmbApplicant}",
            methods: ["GET", "HEAD"],
            parameters: ["spmbApplicant"],
            bindings: { spmbApplicant: "id" },
        },
        "spmb.applicant.edit": {
            uri: "dashboard\/spmb\/applicant\/{spmbApplicant}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["spmbApplicant"],
            bindings: { spmbApplicant: "id" },
        },
        "spmb.applicant.update": {
            uri: "dashboard\/spmb\/applicant\/{spmbApplicant}",
            methods: ["PUT"],
            parameters: ["spmbApplicant"],
            bindings: { spmbApplicant: "id" },
        },
        "spmb.applicant.destroy": {
            uri: "dashboard\/spmb\/applicant\/{spmbApplicant}",
            methods: ["DELETE"],
            parameters: ["spmbApplicant"],
            bindings: { spmbApplicant: "id" },
        },
        "spmb.ranking.index": {
            uri: "dashboard\/spmb\/ranking",
            methods: ["GET", "HEAD"],
        },
        "spmb.ranking.proses": {
            uri: "dashboard\/spmb\/ranking\/proses",
            methods: ["POST"],
        },
        "spmb.ranking.hitung-skor": {
            uri: "dashboard\/spmb\/ranking\/hitung-skor\/{spmbApplicant}",
            methods: ["GET", "HEAD"],
            parameters: ["spmbApplicant"],
            bindings: { spmbApplicant: "id" },
        },
        "spmb.config.create": {
            uri: "dashboard\/spmb\/config\/create",
            methods: ["GET", "HEAD"],
        },
        "spmb.config.index": {
            uri: "dashboard\/spmb\/config",
            methods: ["GET", "HEAD"],
        },
        "spmb.config.store": {
            uri: "dashboard\/spmb\/config",
            methods: ["POST"],
        },
        "spmb.config.update": {
            uri: "dashboard\/spmb\/config\/{spmbConfig}",
            methods: ["PUT"],
            parameters: ["spmbConfig"],
            bindings: { spmbConfig: "id" },
        },
        "spmb.config.destroy": {
            uri: "dashboard\/spmb\/config\/{spmbConfig}",
            methods: ["DELETE"],
            parameters: ["spmbConfig"],
            bindings: { spmbConfig: "id" },
        },
        "spmb.config.edit": {
            uri: "dashboard\/spmb\/config\/{spmbConfig}\/edit",
            methods: ["GET", "HEAD"],
            parameters: ["spmbConfig"],
            bindings: { spmbConfig: "id" },
        },
        "spmb.config.show": {
            uri: "dashboard\/spmb\/config\/{spmbConfig}",
            methods: ["GET", "HEAD"],
            parameters: ["spmbConfig"],
            bindings: { spmbConfig: "id" },
        },
    },
};
if (typeof window !== "undefined" && typeof window.Ziggy !== "undefined") {
    Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };
