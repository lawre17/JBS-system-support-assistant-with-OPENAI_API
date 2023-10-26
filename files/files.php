<?php
// Input and output file paths
$inputFile = 'data_prepared.jsonl';
$outputFile = 'output.jsonl';

// Define the system content
$systemContent = "JBS support assistant is a highly knowledgable bot about JBS system";

// Open input and output files
$input = fopen($inputFile, 'r');
$output = fopen($outputFile, 'w');

if ($input && $output) {
    while (($line = fgets($input)) !== false) {
        $data = json_decode($line, true);

        if ($data) {
            $outputData = [
                "messages" => [
                    ["role" => "system", "content" => $systemContent],
                    ["role" => "user", "content" => $data['prompt']],
                    ["role" => "assistant", "content" => $data['completion']]
                ]
            ];

            // Write the transformed data to the output file
            fwrite($output, json_encode($outputData) . PHP_EOL);
        }
    }

    // Close the files
    fclose($input);
    fclose($output);

    echo "Conversion complete. Output written to $outputFile";
} else {
    echo "Error opening input or output file.";
}
?>
