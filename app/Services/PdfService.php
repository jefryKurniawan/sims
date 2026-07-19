<?php

namespace App\Services;

use Mpdf\Mpdf;
use Mpdf\MpdfException;
use Exception;
use Symfony\Component\HttpFoundation\StreamedResponse;

class PdfService
{
    public static function stream(string $view, array $data, string $filename, array $config = []): StreamedResponse
    {
        try {
            $mpdf = self::make($config);
            $html = view($view, $data)->render();
            $mpdf->WriteHTML($html);

            return response()->stream(function () use ($mpdf, $filename) {
                $mpdf->Output($filename, 'I');
            }, 200, [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'inline; filename="' . $filename . '"',
                'Cache-Control' => 'no-store, no-cache',
            ]);
        } catch (MpdfException $e) {
            \Log::error('mPDF Error: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return response('PDF generation failed: ' . $e->getMessage(), 500);
        } catch (Exception $e) {
            \Log::error('PDF Error: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return response('PDF generation failed: ' . $e->getMessage(), 500);
        }
    }

    public static function download(string $view, array $data, string $filename, array $config = []): StreamedResponse
    {
        try {
            $mpdf = self::make($config);
            $html = view($view, $data)->render();
            $mpdf->WriteHTML($html);

            return response()->stream(function () use ($mpdf, $filename) {
                $mpdf->Output($filename, 'D');
            }, 200, [
                'Content-Type' => 'application/pdf',
                'Content-Disposition' => 'attachment; filename="' . $filename . '"',
                'Cache-Control' => 'no-store, no-cache',
            ]);
        } catch (MpdfException $e) {
            \Log::error('mPDF Error: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return response('PDF generation failed: ' . $e->getMessage(), 500);
        } catch (Exception $e) {
            \Log::error('PDF Error: ' . $e->getMessage(), ['trace' => $e->getTraceAsString()]);
            return response('PDF generation failed: ' . $e->getMessage(), 500);
        }
    }

    private static function make(array $config = []): Mpdf
    {
        $defaults = [
            'mode' => 'utf-8',
            'format' => 'A4',
            'margin_left' => 15,
            'margin_right' => 15,
            'margin_top' => 15,
            'margin_bottom' => 20,
            'default_font' => 'dejavusans',
            'tempDir' => storage_path('app/tmp/mpdf'),
        ];

        return new Mpdf(array_merge($defaults, $config));
    }
}