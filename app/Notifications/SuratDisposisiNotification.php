<?php

namespace App\Notifications;

use App\Models\SuratMasuk;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class SuratDisposisiNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public SuratMasuk $suratMasuk
    ) {}

    public function via($notifiable): array
    {
        return ['database'];
    }

    public function toArray($notifiable): array
    {
        return [
            'surat_masuk_id' => $this->suratMasuk->id,
            'no_surat' => $this->suratMasuk->no_surat,
            'perihal' => $this->suratMasuk->perihal,
            'asal_surat' => $this->suratMasuk->asal_surat,
            'instruksi' => $this->suratMasuk->disposisi_instruksi,
            'batas_waktu' => $this->suratMasuk->disposisi_batas_waktu?->format('d/m/Y'),
            'message' => "Anda menerima disposisi surat: {$this->suratMasuk->no_surat} - {$this->suratMasuk->perihal}",
        ];
    }

    public function toMail($notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Disposisi Surat Masuk: ' . $this->suratMasuk->no_surat)
            ->line("Anda menerima disposisi untuk surat masuk:")
            ->line("Nomor Surat: {$this->suratMasuk->no_surat}")
            ->line("Perihal: {$this->suratMasuk->perihal}")
            ->line("Dari: {$this->suratMasuk->asal_surat}")
            ->line("Instruksi: {$this->suratMasuk->disposisi_instruksi}")
            ->line("Batas Waktu: " . ($this->suratMasuk->disposisi_batas_waktu?->format('d/m/Y') ?? '-'))
            ->action('Lihat Surat', url('/dashboard/tu/surat-masuk/' . $this->suratMasuk->id))
            ->line('Terima kasih.');
    }
}
